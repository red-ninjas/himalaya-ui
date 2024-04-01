export type ProjectAttribute = {
  name: string;
  optional: boolean;
  types: string[];
};
export type ProjectAttributeGroup = {
  name: string;
  attributes: ProjectAttribute[];
};
export type ProjectParams = {
  [key: string]: ProjectAttributeGroup[];
};
