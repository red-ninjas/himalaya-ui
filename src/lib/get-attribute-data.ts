import typesData from '../docs/types.json';
import { ProjectAttributeGroup, ProjectParams } from './doc-types';

export const getAttributeTableData = (key: string): ProjectAttributeGroup[] | undefined => {
  const project = typesData as ProjectParams;
  return project[key];
};
