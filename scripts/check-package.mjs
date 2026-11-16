// Dependency-free ZIP/source integrity check. Not a complete secret or privacy scanner.
import {readFileSync, lstatSync, existsSync} from 'node:fs';
import {resolve, dirname, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {inflateRawSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const archivePath=resolve(process.argv[2]||resolve(root,'dist/family-history-tree-app-source.zip'));
const prefix='family-history-tree-app/';
const rootFiles=new Set(['README.md','LICENSE','CONTRIBUTING.md','SECURITY.md','package.json','.gitignore','AGENTS.md']);
const rootDirs=new Set(['dist','docs','tests','scripts','schemas','design','.github']);
const textSuffix=/\.(?:html|css|js|mjs|json|md|py|yml|yaml|txt)$/i;
const secretPatterns=[/sk-or-v1-[A-Za-z0-9_-]{32,}/,/sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{40,}/,/gh[pousr]_[A-Za-z0-9]{30,}/,/github_pat_[A-Za-z0-9_]{40,}/,/AKIA[0-9A-Z]{16}/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
const fail=message=>{throw Error(message);};
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function validPath(name){
 if(!name.startsWith(prefix))fail('Unexpected archive prefix');
 const path=name.slice(prefix.length),parts=path.split('/');
 if(!path||path.includes('\\')||path.includes('\0')||parts.some(p=>!p||p==='.'||p==='..')||path.startsWith('/'))fail('Unsafe archive path');
 const lower=parts.map(p=>p.toLowerCase());
 if(lower.some(p=>p.startsWith('.env')||['private-data','uploads','node_modules','__pycache__','.git','.ds_store'].includes(p)||p.startsWith('_qa')||p.startsWith('_mobile')||p.includes('harness')))fail(`Denied archive path: ${path}`);
 if(path!=='SOURCE_MANIFEST.json'&&!(rootFiles.has(path)||(rootDirs.has(parts[0])&&parts.length>1&&textSuffix.test(path))))fail(`Path outside source allowlist: ${path}`);
 return path;
}
function readEntries(bytes){
 let end=-1;for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--)if(bytes.readUInt32LE(i)===0x06054b50){end=i;break;}
 if(end<0)fail('ZIP directory missing');
 if(bytes.readUInt16LE(end+4)||bytes.readUInt16LE(end+6))fail('Multi-disk archives unsupported');
 const count=bytes.readUInt16LE(end+10),directorySize=bytes.readUInt32LE(end+12),offset=bytes.readUInt32LE(end+16);
 if(count===65535||directorySize===0xffffffff||offset===0xffffffff)fail('ZIP64 unsupported');
 if(offset+directorySize!==end||end+22+bytes.readUInt16LE(end+20)!==bytes.length)fail('Malformed ZIP directory or trailing content');
 const entries=new Map();let cursor=offset;
 for(let index=0;index<count;index++){
  if(cursor+46>end||bytes.readUInt32LE(cursor)!==0x02014b50)fail('Invalid ZIP directory entry');
  const flags=bytes.readUInt16LE(cursor+8),method=bytes.readUInt16LE(cursor+10),compressed=bytes.readUInt32LE(cursor+20),size=bytes.readUInt32LE(cursor+24),nameLength=bytes.readUInt16LE(cursor+28),extraLength=bytes.readUInt16LE(cursor+30),commentLength=bytes.readUInt16LE(cursor+32),attrs=bytes.readUInt32LE(cursor+38),local=bytes.readUInt32LE(cursor+42);
  const name=bytes.subarray(cursor+46,cursor+46+nameLength).toString('utf8'),path=validPath(name);
  if(entries.has(path))fail(`Duplicate ZIP path: ${path}`);
  if((attrs>>>16&0o170000)===0o120000)fail(`Symlink in ZIP: ${path}`);
  if(flags&1||![0,8].includes(method))fail(`Unsupported encrypted/compression entry: ${path}`);
  if(size>32*1024*1024)fail(`Source text exceeds packaging resource guard: ${path}`);
  if(local+30>offset||bytes.readUInt32LE(local)!==0x04034b50)fail('Invalid local ZIP entry');
  const localNameLength=bytes.readUInt16LE(local+26),localExtraLength=bytes.readUInt16LE(local+28),start=local+30+localNameLength+localExtraLength;
  if(bytes.subarray(local+30,local+30+localNameLength).toString('utf8')!==name||start+compressed>offset)fail('ZIP local/directory mismatch');
  const packed=bytes.subarray(start,start+compressed),data=method===8?inflateRawSync(packed,{maxOutputLength:32*1024*1024}):packed;
  if(data.length!==size)fail(`ZIP size mismatch: ${path}`);
  const text=data.toString('utf8');if(!Buffer.from(text,'utf8').equals(data))fail(`Non-UTF-8 source: ${path}`);
  if(secretPatterns.some(pattern=>pattern.test(text)))fail(`Credential-like content in ${path}; value not printed`);
  entries.set(path,data);cursor+=46+nameLength+extraLength+commentLength;
 }
 if(cursor!==end)fail('ZIP directory entry count mismatch');return entries;
}
try{
 if(lstatSync(archivePath).isSymbolicLink())fail('Archive itself is a symlink');
 const zip=readFileSync(archivePath),entries=readEntries(zip),manifestBytes=entries.get('SOURCE_MANIFEST.json');
 if(!manifestBytes)fail('Source manifest missing');
 const manifest=JSON.parse(manifestBytes.toString('utf8'));
 if(manifest.format!=='family-history-source-manifest'||manifest.version!==1||!Array.isArray(manifest.files))fail('Unsupported source manifest');
 const seen=new Set();for(const file of manifest.files){
  const path=validPath(prefix+file.path);if(path==='SOURCE_MANIFEST.json'||seen.has(path))fail('Invalid/duplicate manifest path');seen.add(path);
  const data=entries.get(path);if(!data||file.bytes!==data.length||file.sha256!==hash(data))fail(`Manifest hash/size mismatch: ${path}`);
  const disk=resolve(root,path);if(relative(root,disk).startsWith('..'+sep)||!existsSync(disk)||lstatSync(disk).isSymbolicLink())fail(`Unsafe/missing source file: ${path}`);
  for(let parent=dirname(disk);parent!==root;parent=dirname(parent))if(lstatSync(parent).isSymbolicLink())fail(`Symlink source ancestor: ${path}`);
  if(hash(readFileSync(disk))!==file.sha256)fail(`Archive differs from current source: ${path}`);
 }
 if(entries.size!==seen.size+1)fail('Unmanifested archive entries');
 for(const path of rootFiles)if(!seen.has(path))fail(`Required root file missing: ${path}`);
 for(const name of ['PRD.md','ARCHITECTURE.md','UX_PRIORITIES.md','FEATURE_INVENTORY.md','DESIGN_SYSTEM.md','DESIGN_EVALS.md','PRODUCT_CHARTER.md'])if(!entries.get('docs/'+name)?.equals(entries.get('dist/docs/'+name)||Buffer.alloc(0)))fail(`Published document drift: ${name}`);
 if(!entries.get('design/contract.json')?.equals(entries.get('dist/design-contract.json')||Buffer.alloc(0)))fail('Published design contract drift');
 console.log(`Package verified: ${seen.size} files; SHA-256 ${hash(zip)}`);
 console.log('Checked allowlisted paths/types, symlinks, known credential patterns, per-file hashes, source equality and published-doc drift. Unknown secrets/personal content still require human review.');
}catch(error){console.error(`Package check failed: ${error.message}`);process.exitCode=1;}
