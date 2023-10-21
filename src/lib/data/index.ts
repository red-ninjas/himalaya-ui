import enUS from './metadata.json'
export type MetadataEntry = {
  name: string
  url?: string
  localeName?: string
  children?: MetadataEntry | Array<MetadataEntry>
}
export default enUS as MetadataEntry[]
