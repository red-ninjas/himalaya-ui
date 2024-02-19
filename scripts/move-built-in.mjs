import { resolve, join, dirname } from 'path';
import { copy } from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const builtInPath = resolve(__dirname, 'built-in');
const bundleFolderPath = resolve(__dirname, '../dist/bundle');
const builtInFiles = ['styled-jsx.es.js', 'styled-jsx-server.es.js'];

(async () => {
  await Promise.all(
    builtInFiles.map(async name => {
      const filePath = join(builtInPath, name);
      const target = join(bundleFolderPath, name);
      await copy(filePath, target, { overwrite: true });
    }),
  );
  console.log('[bundle]> Export of styled-jsx has been successfully replaced.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
