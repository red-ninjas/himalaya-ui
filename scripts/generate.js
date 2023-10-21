const fs = require('fs')
const path = require('path')
const lodash = require('lodash')

const iconsDir = path.join(__dirname, '..', 'src', 'components', 'icons');
const outputFilePath = path.join(__dirname, '..', 'src', 'components', 'icons', 'index.ts');

fs.readdirSync(iconsDir).forEach(file => {
  if (file.endsWith('.tsx')) {
    const oldFilePath = path.join(iconsDir, file)
    const iconName = path.basename(file, '.tsx')
    const newFileName = lodash.camelCase(iconName).split(' ').join('') + '.tsx'
    const newFilePath = path.join(iconsDir, newFileName)

    fs.renameSync(oldFilePath, newFilePath)

    console.log(`Renamed ${file} to ${newFileName}`)
  }
})

const iconFiles = fs
  .readdirSync(iconsDir)
  .filter(file => file.endsWith('.tsx') && file !== 'index.ts')
  .map(file => {
    const iconName = path.basename(file, '.tsx')
    const componentName = lodash.startCase(iconName).split(' ').join('')
    return `export { default as ${componentName} } from './${iconName}';`
  })

const indexContent = iconFiles.join('\n')

fs.writeFileSync(outputFilePath, indexContent)
console.log(`Index file generated at ${outputFilePath}`)
