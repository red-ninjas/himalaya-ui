'use server';
import _ from 'lodash';
import { promises as fs } from 'node:fs';
import { cache } from 'react';
import {
  FunctionParser,
  IntersectionTypeParser,
  IntrinsicTypeParser,
  LiteralTypeParser,
  ParameterParser,
  ProjectParser,
  PropertyParser,
  ReferenceTypeParser,
  ReflectionTypeParser,
  TypeParser,
  UnionTypeParser,
} from 'typedoc-json-parser';

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

export const extractTypes = (typeArgs: TypeParser[]) => {
  let types: string[] = [];

  for (const type of typeArgs) {
    if (type instanceof LiteralTypeParser) {
      types.push(type.value);
    } else if (type instanceof UnionTypeParser) {
      types = [...types, ...extractTypes(type.types)];
    } else if (type instanceof IntrinsicTypeParser) {
      types.push(type.type);
    } else if (type instanceof ReferenceTypeParser) {
      if (type.typeArguments.length <= 0) {
        types.push(type.name);
      } else {
        types = [...types, ...extractTypes(type.typeArguments)];
      }
    }
  }

  return types;
};

export const exptractAttributes = (parser: PropertyParser[] | null): ProjectAttribute[] => {
  const attributes: ProjectAttribute[] = [];

  for (const parse of parser || []) {
    const types: string[] = extractTypes([parse.type]);
    attributes.push({ name: parse.name, optional: parse.optional, types });
  }

  return attributes;
};
export const extractParamsParsersTypes = (project: ProjectParser, parameters: TypeParser[]): ProjectAttributeGroup[] => {
  let groups: ProjectAttributeGroup[] = [];

  for (const param of parameters) {
    if (param instanceof ReferenceTypeParser) {
      if (param.id != null) {
        const refArgumentTranslated = project.interfaces.find(df => df.id == param.id);

        if (refArgumentTranslated !== undefined) {
          groups.push({ name: param.name, attributes: exptractAttributes(refArgumentTranslated.properties) });
        } else {
          groups.push({ name: param.name, attributes: [] });
        }
      } else {
        groups = [...groups, ...extractParamsParsersTypes(project, param.typeArguments)];
      }
    } else if (param instanceof IntersectionTypeParser) {
      groups = [...groups, ...extractParamsParsersTypes(project, param.types)];
    } else if (param instanceof ReflectionTypeParser) {
      const attributes = exptractAttributes(param.properties);
      groups.push({ name: 'general', attributes: attributes });
    }
  }
  return groups;
};

export const extractParamsParsers = (project: ProjectParser, parameters: ParameterParser[]): ProjectAttributeGroup[] => {
  let groups: ProjectAttributeGroup[] = [];

  for (const param of parameters) {
    groups = [...groups, ...extractParamsParsersTypes(project, [param.type])];
  }
  return groups;
};

export const getDocumentationFromJson = cache(async (): Promise<ProjectParams> => {
  const data = await fs.readFile(process.cwd() + '/src/docs/types.json', 'utf8');
  const project = new ProjectParser({ data: JSON.parse(data) });

  const interfaceChilds = project.children
    .filter(df => df.source?.path.startsWith('src/components/'))
    .filter(df => df instanceof FunctionParser)
    .map(df => df as FunctionParser);

  const projectParams: ProjectParams = {};
  for (const child of interfaceChilds) {
    let groups: ProjectAttributeGroup[] = [];

    groups = extractParamsParsers(project, _.flatten(child.signatures.map(df => df.parameters)));
    projectParams[child.name] = groups;
  }
  return projectParams;
});
