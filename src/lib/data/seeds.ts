import enUS from './seeds.json'

export type Seed = {
  name: string
  url: string
  group?: string
}

export type Seeds = Array<Seed>
export default enUS as Seeds
