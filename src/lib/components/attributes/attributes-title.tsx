'use client';

import { Code } from 'components';
import React from 'react';
import { VirtualAnchor } from '../pures';

export interface AttributesTitleProps {
  alias?: string;
}

const getAlias = (alias?: string) => {
  if (!alias) return null;
  return (
    <small>
      <span>[</span>
      {'alias'}: <Code>{alias}</Code>
      <span>]</span>
    </small>
  );
};

const AttributesTitle: React.FC<React.PropsWithChildren<AttributesTitleProps>> = React.memo(({ children, alias }) => {
  return (
    <>
      <h4 className="title">
        <Code>
          <VirtualAnchor pure>{children}</VirtualAnchor>
        </Code>
        {getAlias(alias)}
      </h4>

      <style jsx>{`
        h4 {
          display: inline-flex;
          align-items: center;
          padding-left: var(--layout-gap-quarter);
          padding-right: var(--layout-gap-half);
          background-color: var(--color-background-800);
          border-radius: var(--layout-radius);
          margin-bottom: 0;
        }

        h4 :global(small) {
          font-size: 0.65em;
          padding-left: 0.65rem;
          color: var(--color-background-500);
          align-self: flex-end;
          line-height: 1.6rem;
        }

        h4 :global(span) {
          color: var(--color-background-300);
        }
      `}</style>
    </>
  );
});

AttributesTitle.displayName = 'HimalayaAttributesTitle';
export default AttributesTitle;
