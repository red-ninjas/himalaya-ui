'use client';
import { Card, Code, Divider, Spacer, Table, Text } from 'components';
import { getAttributeTableData } from 'lib/get-attribute-data';
import React, { useMemo } from 'react';
import { VirtualAnchor } from '../pures';
import AttributesTable from './attributes-table';
import AttributesTitle from './attributes-title';
import Contributors from './contributors';

export interface AttributesProps {
  edit: string;
  component?: string;
}

const Attributes: React.FC<React.PropsWithChildren<AttributesProps>> = React.memo(({ edit, children, component }) => {
  const pathParts = edit.split('/');
  const lastPart = pathParts.pop();
  const path = pathParts.join('/') + '/' + lastPart?.replace(/\.mdx$/, '') + '/' + lastPart;

  const data = component ? getAttributeTableData(component) : undefined;

  const renderTypes = value => {
    const totalValues = typeof value === 'object' ? value.length : 0;
    return (
      <div className="render-types">
        {value.map((type, index) => (
          <div className="render-type" key={'type-index-' + index}>
            <Code scale={0.8}>{type}</Code>
            {index + 1 < totalValues && <span>{'|'}</span>}
          </div>
        ))}

        <style jsx>{`
          .render-type {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 6px;
          }
          .render-types {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 6px;
          }
        `}</style>
      </div>
    );
  };

  const renderOptional = value => {
    return value ? 'True' : 'False';
  };

  const apiTitles = useMemo(() => {
    return (
      data && (
        <div style={{ width: '100%' }}>
          <Spacer h={1} />
          <h3>
            <VirtualAnchor>APIs</VirtualAnchor>
          </h3>

          <div className="apis">
            {data.map((attributeGroup, index) => (
              <Card hoverable={false} key={`attribute-${index}`}>
                <Text mb={2} h4 my={0}>
                  {attributeGroup.name}
                </Text>

                <Table data={attributeGroup.attributes}>
                  <Table.Column prop="name" label="Property" />
                  <Table.Column prop="optional" label="optional" render={renderOptional} />
                  <Table.Column prop="types" label="types" render={renderTypes} />
                </Table>
              </Card>
            ))}
          </div>

          <style jsx>{`
            .apis {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
          `}</style>
        </div>
      )
    );
  }, [data]);

  return (
    <>
      {apiTitles}
      {children}
      <Divider font="12px" mt="80px">
        <Text b type="secondary" style={{ userSelect: 'none' }}>
          {'Contributors'}
        </Text>
      </Divider>
      <Contributors path={path} />
    </>
  );
});

type AttributesComponent<P> = React.FC<P> & {
  Title: typeof AttributesTitle;
  Table: typeof AttributesTable;
};

Attributes.displayName = 'HimalayaAttributes';
export default Attributes as AttributesComponent<AttributesProps>;
