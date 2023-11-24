'use client';
import React, { useMemo } from 'react';
import { Spacer, Divider, Text } from 'components';
import { VirtualAnchor } from '../pures';
import Contributors from './contributors';
import AttributesTitle from './attributes-title';
import AttributesTable from './attributes-table';

export interface AttributesProps {
  edit: string;
}

const Attributes: React.FC<React.PropsWithChildren<AttributesProps>> = React.memo(({ edit, children }) => {
  const pathParts = edit.split('/');
  const lastPart = pathParts.pop();
  const path = pathParts.join('/') + '/' + lastPart?.replace(/\.mdx$/, '') + '/' + lastPart;

  const apiTitles = useMemo(() => {
    if (React.Children.count(children) === 0) return null;
    return (
      <>
        <Spacer h={1} />
        <h3>
          <VirtualAnchor>APIs</VirtualAnchor>
        </h3>
        <AttributesTable>{children}</AttributesTable>
      </>
    );
  }, [children]);

  return (
    <>
      {apiTitles}
      <Divider font="12px" mt="80px">
        <Text p b type="secondary" style={{ userSelect: 'none' }}>
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
