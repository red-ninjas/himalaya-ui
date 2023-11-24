'use client';

import React from 'react';
import { VirtualAnchor } from '../pures';
import { Code, useLayout, useTheme } from 'components';

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
  const theme = useTheme();
  const layout = useLayout();

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
          padding-left: ${layout.gapQuarter};
          padding-right: ${layout.gapHalf};
          background-color: ${theme.palette.accents_1};
          border-radius: ${theme.style.radius};
          margin-bottom: 0;
        }

        h4 :global(small) {
          font-size: 0.65em;
          padding-left: 0.65rem;
          color: ${theme.palette.accents_4};
          align-self: flex-end;
          line-height: 1.6rem;
        }

        h4 :global(span) {
          color: ${theme.palette.accents_6};
        }
      `}</style>
    </>
  );
});

AttributesTitle.displayName = 'HimalayaAttributesTitle';
export default AttributesTitle;
