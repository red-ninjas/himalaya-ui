import _ from 'lodash';
import enUS from './metadata.json';
export type MetadataEntry = {
  name: string;
  url?: string;
  group?: string;
  index?: number;
  localeName?: string;
  description?: string;
  children?: MetadataEntry | Array<MetadataEntry>;
};

const datas: MetadataEntry[] = enUS as MetadataEntry[];
export default datas;

const result = _.compact(_.flatten(datas.map(df => df.children)));
const metaDataArray = _.compact(_.flatten(result.map(df => df.children)));

export const Seeds = metaDataArray;
