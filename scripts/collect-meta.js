const fs = require('fs-extra')
const path = require('path')
const extractMetadata = require('extract-mdx-metadata')
const pagePrefix = path.join(__dirname, '../src/app')

const getTargetPath = () => {
  return path.join(__dirname, '../src/lib/data/', `metadata.json`)
}

const weights = {
  guide: 1,
  docs: 2,
  'getting-started': 3,
  components: 5,
  customization: 10,
}
const groupWeights = {
  general: 1,
  layout: 2,
  surfaces: 3,
  'data entry': 4,
  'data display': 5,
  feedback: 6,
  navigation: 7,
  others: 8,
  utils: 10,
}

const getMetadata = async (files, parentPath) => {
  return Promise.all(
    files
      .filter(name => name.endsWith('.mdx') || !name.includes('.'))
      .map(async file => {
        const filePath = path.join(parentPath, file)

        const isDirectory = fs.statSync(filePath).isDirectory()
        if (isDirectory) {
          let hasPage = false
          try {
            hasPage = fs.statSync(path.join(filePath, 'page.tsx'))
          } catch (err) {
            hasPage = false
          }

          if (!hasPage) {
            const children = await fs.readdir(filePath)
            const childrenMetadata = await getMetadata(children, filePath)
            const sorted = childrenMetadata.sort((a, b) => a.index - b.index)

            // grouping
            const childrenHasGroup = sorted
              .filter(item => !!item)
              .find(item => {
                return item?.group ?? {}
              })
            if (childrenHasGroup) {
              const groups = [...new Set(sorted.map(item => item.group || 'others'))]
              const groupChildren = groups
                .map(groupName => ({
                  name: groupName,
                  children: sorted.filter(item => (item.group || 'others') === groupName),
                }))
                .sort((a, b) => {
                  const pre = a.name.toLowerCase()
                  const current = b.name.toLowerCase()
                  return groupWeights[pre] - groupWeights[current]
                })
              return {
                name: file,
                url: `/${file}`,
                children: groupChildren,
              }
            }

            return { name: file, children: sorted }
          } else {
            const previousFolder = path.basename(filePath)
            try {
              const content = await fs.readFile(
                path.join(filePath, previousFolder + '.mdx'),
                'utf-8',
              )

              const meta = await extractMetadata(content)
              const url = filePath
                .replace(pagePrefix, '')
                .replace('.mdx', '')
                .replace(/\\/g, '/')
                .toString()
              const val = {
                name: meta.title || file,
                url: url,
                index: meta.index || 100,
                group: meta.group || null,
              }
              return val
            } catch (e) {
              console.error('error in', path.join(filePath, previousFolder + '.mdx'))
              throw e
            }
          }
        }
      }),
  )
}

  ; (async () => {
    try {
      const dirs = await fs.readdir(pagePrefix)
      const childDirs = dirs.filter(df =>
        fs.statSync(path.join(pagePrefix, df)).isDirectory(),
      )
      const data = await getMetadata(childDirs, pagePrefix)
      const sorted = data.sort((a, b) => weights[a.name] - weights[b.name])
      const targetPath = getTargetPath()
      await fs.ensureFile(targetPath)
      await fs.writeJson(targetPath, sorted, {})
    } catch (e) {
      console.log(e)
      process.exit(1)
    }
  })()
