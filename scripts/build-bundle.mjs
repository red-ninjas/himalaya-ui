import { resolve } from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { load, clean } from 'clean-package';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const packagePath = resolve(__dirname, 'package.json');
const readmePath = resolve(__dirname, 'README.md');
const packageBundlePath = resolve(__dirname, 'dist/bundle/package.json');
const packageReadmePath = resolve(__dirname, 'dist/bundle/README.md');
const bundlePath = resolve(__dirname, '../dist/bundle');

const moveFiles = async () => {
  await fs.copy(packagePath, packageBundlePath, { overwrite: true });
  await fs.copy(readmePath, packageReadmePath, { overwrite: true });

  const [source, config] = load(packageBundlePath, {
    backupPath: null,
    remove: ['devDependencies', 'scripts', 'prettier'],
    replace: {
      main: 'index.js',
      module: 'index.js',
      types: 'index.d.ts',
      exports: './index.js',
      files: ['*'],
    },
  });
  clean(source, config);
  await fs.remove(resolve(bundlePath, 'package.json.backup'));
  await fs.writeFile(packageBundlePath, JSON.stringify(source, null, 2));
};

moveFiles();
