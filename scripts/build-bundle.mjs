import { resolve, join } from 'path'
import fs from 'fs-extra'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esmPath = resolve(__dirname, '../dist/esm')
const packagePath = resolve(__dirname, '../package.json')
const readmePath = resolve(__dirname, '../README.md')
const packageBundlePath = resolve(__dirname, '../dist/bundle/package.json')
const packageReadmeePath = resolve(__dirname, '../dist/bundle/README.md')
const frameworkPath = resolve(__dirname, '../dist/framework')
const bundleEsmPath = resolve(__dirname, '../dist/bundle/esm')
const bundlePath = resolve(__dirname, '../dist/bundle')
import { load, clean, restore, version } from 'clean-package';


const moveFiles = async () => {
  await fs.remove(bundlePath);
  await fs.copy(frameworkPath, bundlePath, { overwrite: true, recursive: true })
  await fs.copy(esmPath, bundleEsmPath, { recursive: true })
  await fs.copy(packagePath, packageBundlePath, { overwrite: true })
  await fs.copy(readmePath, packageReadmeePath, { overwrite: true })

  const [source, config] = load(packageBundlePath, {
    "backupPath": null,
    "remove": [
      "devDependencies",
      "scripts",
      "prettier"
    ],
    "replace": {
      "main": "index.js",
      "module": "esm/index.js",
      "types": "esm/index.d.ts",
      "files": [
        "*"
      ]
    }
  });
  clean(source, config);
  await fs.remove(resolve(bundlePath, 'package.json.backup'))
}

moveFiles();
