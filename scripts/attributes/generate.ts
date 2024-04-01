import _ from 'lodash';
import { promises as fs } from 'node:fs';
import {
  FunctionParser,
  InterfaceParser,
  IntersectionTypeParser,
  IntrinsicTypeParser,
  LiteralTypeParser,
  ParameterParser,
  ProjectParser,
  PropertyParser,
  ReferenceTypeParser,
  ReflectionTypeParser,
  TypeAliasParser,
  TypeOperatorTypeParser,
  TypeParser,
  UnionTypeParser,
} from 'typedoc-json-parser';

const data = await fs.readFile(process.cwd() + '/api-types.json', 'utf8');
const project = new ProjectParser({ data: JSON.parse(data) });

type ProjectAttribute = {
  name: string;
  optional: boolean;
  types: string[];
};
type ProjectAttributeGroup = {
  name: string;
  attributes: ProjectAttribute[];
};
type ProjectParams = {
  [key: string]: ProjectAttributeGroup[];
};

const extractTypes = (typeArgs: TypeParser[]) => {
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

const exptractAttributes = (parser: PropertyParser[] | null): ProjectAttribute[] => {
  const attributes: ProjectAttribute[] = [];

  for (const parse of parser || []) {
    const types: string[] = extractTypes([parse.type]);
    attributes.push({ name: parse.name, optional: parse.optional, types });
  }

  return attributes;
};

const extractParamsParsersTypes = (parameters: TypeParser[], overrideName?: string): ProjectAttributeGroup[] => {
  let groups: ProjectAttributeGroup[] = [];
  for (const param of parameters) {
    if (param instanceof ReferenceTypeParser) {
      if (param.id != null) {
        const refArgumentTranslated = project.find(param.id);

        if (refArgumentTranslated) {
          if (refArgumentTranslated instanceof TypeAliasParser) {
            groups = [...groups, ...extractParamsParsersTypes([refArgumentTranslated.type], refArgumentTranslated.name)];
          } else if (refArgumentTranslated instanceof InterfaceParser) {
            const attributes = exptractAttributes(refArgumentTranslated.properties);
            groups.push({
              name: param.name,
              attributes,
            });
          } else {
            console.log('NOT IMPLEMENTED', refArgumentTranslated);
          }
        }
      }

      if (param.typeArguments) {
        groups = [...groups, ...extractParamsParsersTypes(param.typeArguments, overrideName)];
      }
    } else if (param instanceof IntersectionTypeParser) {
      groups = [...groups, ...extractParamsParsersTypes(param.types, overrideName)];
    } else if (param instanceof ReflectionTypeParser) {
      const attributes = exptractAttributes(param.properties);
      groups.push({ name: overrideName ?? 'Default', attributes: attributes });
    }
  }
  return groups;
};

const extractParamsParsers = (parameters: ParameterParser[]): ProjectAttributeGroup[] => {
  let groups: ProjectAttributeGroup[] = [];

  for (const param of parameters) {
    groups = [...groups, ...extractParamsParsersTypes([param.type], param.name)];
  }
  return groups;
};

const getDocumentationFromJson = async () => {
  const interfaceChilds = project.children
    .filter(df => df.source?.path.startsWith('src/components/'))
    .filter(df => df instanceof FunctionParser)
    .map(df => df as FunctionParser);

  const projectParams: ProjectParams = {};
  for (const child of interfaceChilds) {
    let groups: ProjectAttributeGroup[] = [];
    groups = extractParamsParsers(_.flatten(child.signatures.map(df => df.parameters)));
    projectParams[child.name] = groups;
  }
  await fs.writeFile(process.cwd() + '/src/docs/types.json', JSON.stringify(projectParams), 'utf8');
};

await getDocumentationFromJson();

console.log('HI');
