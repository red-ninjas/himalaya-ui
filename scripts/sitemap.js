import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { SitemapStream } from 'sitemap';

const nextFolder = path.join(process.cwd(), 'src', '.next');
const publicFolder = path.join(process.cwd(), 'src', 'public');
const sitemap_xml = path.join(publicFolder, 'sitemap.xml');
const traceFile = path.join(nextFolder, 'trace');

const readStream = fs.createReadStream(traceFile, 'utf8');
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity,
});

const exceptions = ['/_not-found', '/500', '/404'];
const stream = new SitemapStream({
  hostname: process.env.SITE_URL || 'https://himalaya-ui.com',
});

const routes = [];

rl.on('line', line => {
  try {
    const jsonData = JSON.parse(line);

    const _routes = jsonData
      .filter(j => j.name === 'export-page')
      .map(r => r.tags.path)
      .filter(r => r)
      .filter(r => !exceptions.includes(r));

    _routes.forEach(route => stream.write({ url: route }));
    routes.push(..._routes);
  } catch (parseError) {
    console.error('Error parsing JSON line:');
    console.error(parseError.message); // Print the specific parsing error message
    console.error('JSON line that caused the error:');
    console.error(line);
  }
});

rl.on('close', () => {
  stream.end();
  const writeStream = fs.createWriteStream(sitemap_xml, 'utf8');
  stream.pipe(writeStream);
  console.log('Routes:', routes.length);
  console.log('Finished reading the "trace" file.');
});
