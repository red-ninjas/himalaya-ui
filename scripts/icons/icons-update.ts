import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs-extra'
const sourceFile = path.join(__dirname, '../', '../', '.source')

export default (async () => {
  try {
    const res = await fetch('https://vercel.com/design/icons')
    const html = await res.text()
    await fs.writeFile(sourceFile, html)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()