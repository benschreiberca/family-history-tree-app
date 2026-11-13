"""Prepare portable documentation and a public-safe source archive."""
from pathlib import Path
from shutil import copy2
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent.parent
out = root / 'dist'
(out / 'docs').mkdir(exist_ok=True)
for name in ('PRD.md', 'ARCHITECTURE.md'):
    copy2(root / 'docs' / name, out / 'docs' / name)
paths = [root / name for name in ('README.md','LICENSE','CONTRIBUTING.md','SECURITY.md','package.json','.gitignore')]
for folder in ('dist','docs','tests','scripts','schemas'):
    paths.extend(p for p in (root / folder).rglob('*') if p.is_file() and p.suffix != '.zip')
with ZipFile(out / 'family-history-tree-app-source.zip', 'w', ZIP_DEFLATED) as archive:
    for path in paths:
        archive.write(path, 'family-history-tree-app/' + str(path.relative_to(root)))
print(out / 'family-history-tree-app-source.zip')
