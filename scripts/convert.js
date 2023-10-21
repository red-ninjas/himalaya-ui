const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const svgDir = path.join(__dirname, '..', 'icons');
const iconsDir = path.join(__dirname, '..', 'src', 'components', 'icons');

if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const svgFiles = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));

svgFiles.forEach(svgFile => {
  const svgFilePath = path.join(svgDir, svgFile);
  const componentName = svgFile.replace('.svg', '');

  const command = `npx @svgr/cli --icon --replace-attr-values "#000=currentColor" ${svgFilePath}`;
  const componentCode = execSync(command, { encoding: 'utf-8' });

  const componentFilePath = path.join(iconsDir, `${componentName}.tsx`);
  fs.writeFileSync(componentFilePath, componentCode, { encoding: 'utf-8' });
});

console.log('Conversion completed successfully.');
