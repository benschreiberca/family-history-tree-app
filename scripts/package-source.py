"""Package an inspected source snapshot. Pattern checks are not a complete privacy audit."""
from hashlib import sha256
from pathlib import Path
from shutil import copy2
from tempfile import TemporaryDirectory
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import json
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'
ARCHIVE = OUT / 'family-history-tree-app-source.zip'
PREFIX = 'family-history-tree-app/'
ROOT_FILES = ('README.md', 'LICENSE', 'CONTRIBUTING.md', 'SECURITY.md', 'package.json', '.gitignore', 'AGENTS.md')
ROOT_DIRS = ('dist', 'docs', 'tests', 'scripts', 'schemas', 'design', '.github')
PUBLISHED_DOCS = ('PRD.md', 'ARCHITECTURE.md', 'UX_PRIORITIES.md', 'FEATURE_INVENTORY.md', 'DESIGN_SYSTEM.md', 'DESIGN_EVALS.md', 'PRODUCT_CHARTER.md')
TEXT_SUFFIXES = {'.html', '.css', '.js', '.mjs', '.json', '.md', '.py', '.yml', '.yaml', '.txt'}
SECRET_PATTERNS = (
    r'sk-or-v1-[A-Za-z0-9_-]{32,}',
    r'sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{40,}',
    r'gh[pousr]_[A-Za-z0-9]{30,}',
    r'github_pat_[A-Za-z0-9_]{40,}',
    r'AKIA[0-9A-Z]{16}',
    r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
)


def inspect(path):
    relative = path.relative_to(ROOT)
    if path.is_symlink():
        raise ValueError(f'Symlink is not permitted in source archive: {relative}')
    parts = relative.parts
    lowered = [part.lower() for part in parts]
    if any(part.startswith('.env') or part in {'private-data', 'uploads', 'node_modules', '__pycache__', '.git', '.ds_store'} for part in lowered):
        raise ValueError(f'Private/runtime path rejected: {relative}')
    if any(part.startswith(('_qa', '_mobile')) or 'harness' in part for part in lowered):
        raise ValueError(f'Temporary verification path rejected: {relative}')
    if not path.is_file():
        return None
    if path.suffix.lower() not in TEXT_SUFFIXES and relative.as_posix() not in ROOT_FILES:
        raise ValueError(f'Unreviewed file type rejected: {relative}')
    raw = path.read_bytes()
    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError as error:
        raise ValueError(f'Non-UTF-8 source rejected: {relative}') from error
    for pattern in SECRET_PATTERNS:
        if re.search(pattern, text):
            raise ValueError(f'Credential-like content detected in {relative}; value not printed')
    return raw


def main():
    if OUT.is_symlink() or (OUT / 'docs').is_symlink():
        raise ValueError('Output directories must not be symlinks')
    (OUT / 'docs').mkdir(exist_ok=True)
    for name in PUBLISHED_DOCS:
        source, target = ROOT / 'docs' / name, OUT / 'docs' / name
        inspect(source)
        if target.is_symlink():
            raise ValueError(f'Generated document target is a symlink: {target.name}')
        copy2(source, target)
    contract_source, contract_target = ROOT / 'design' / 'contract.json', OUT / 'design-contract.json'
    inspect(contract_source)
    if contract_target.is_symlink():
        raise ValueError('Generated design contract target is a symlink')
    copy2(contract_source, contract_target)
    paths = [ROOT / name for name in ROOT_FILES]
    for folder in ROOT_DIRS:
        directory = ROOT / folder
        if directory.is_symlink():
            raise ValueError(f'Archive root is a symlink: {folder}')
        if not directory.is_dir():
            raise ValueError(f'Missing required archive root: {folder}')
        for path in directory.rglob('*'):
            if path in {ARCHIVE, OUT / 'kin-atlas-source.zip'}:
                if path.is_symlink():
                    raise ValueError('Existing output archive is a symlink')
                continue
            if path.is_symlink():
                raise ValueError(f'Symlink rejected: {path.relative_to(ROOT)}')
            if path.is_file():
                paths.append(path)
    entries = []
    manifest_files = []
    for path in sorted(set(paths)):
        raw = inspect(path)
        if raw is None:
            continue
        relative = path.relative_to(ROOT).as_posix()
        entries.append((relative, raw))
        manifest_files.append({'path': relative, 'bytes': len(raw), 'sha256': sha256(raw).hexdigest()})
    manifest = {
        'format': 'family-history-source-manifest',
        'version': 1,
        'scope': 'Working-tree snapshot; release commit provenance is recorded separately.',
        'scanLimit': 'Known credential patterns and path/file-type checks only; human review of fictional-only assets is still required.',
        'files': manifest_files,
    }
    entries.append(('SOURCE_MANIFEST.json', (json.dumps(manifest, indent=2, ensure_ascii=False) + '\n').encode('utf-8')))
    with TemporaryDirectory(prefix='family-source-', dir=OUT) as temporary:
        prepared = Path(temporary) / ARCHIVE.name
        with ZipFile(prepared, 'w', ZIP_DEFLATED) as archive:
            for relative, raw in entries:
                info = ZipInfo(PREFIX + relative, date_time=(1980, 1, 1, 0, 0, 0))
                info.compress_type = ZIP_DEFLATED
                info.create_system = 3
                info.external_attr = 0o100644 << 16
                archive.writestr(info, raw)
        prepared.replace(ARCHIVE)
    print(f'{ARCHIVE}\nPackaged {len(manifest_files)} source files; SHA-256 {sha256(ARCHIVE.read_bytes()).hexdigest()}')
    print('Known-pattern/path checks passed. This is not proof that arbitrary personal information or unknown secrets are absent.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError) as error:
        raise SystemExit(f'Packaging blocked: {error}')
