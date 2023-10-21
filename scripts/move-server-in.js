const { resolve, join } = require('path')
const fs = require('fs-extra')
const documentationPath = resolve(__dirname, '../dist/documentation')
const publicPath = resolve(__dirname, '../src/public')
const serverPath = resolve(__dirname, '../dist/server/.next')
const serverPublicPath = resolve(__dirname, '../dist/server')

const moveFiles = async () => {
  console.log(documentationPath, " to ", serverPath);
  await fs.copy(documentationPath, serverPath, { overwrite: true })
  await fs.copy(publicPath, serverPublicPath, { recursive: true })
}

moveFiles();