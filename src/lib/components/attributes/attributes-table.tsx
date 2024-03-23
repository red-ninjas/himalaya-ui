'use client';

import { Card, useTheme, useLayout } from 'components';
import React from 'react';

const AttributesTable: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <Card className="attr">
      {children}
      <style jsx global>{`
        .attr .pre {
          margin-top: 12px !important;
        }
        .attr table {
          margin-top: 12px;
          margin-right: ${layout.gap};
        }
        .attr h4.title {
          margin-top: calc(${layout.gap} * 2.2);
          background-color: var(--theme-color-background-900);
          color: ${theme.palette.code.hex_1000};
          border-radius: 0;
        }
        .attr h4.title:first-of-type {
          margin-top: 0;
        }
        .attr table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }
        .attr thead th td {
          height: 2.5rem;
        }
        .attr tbody tr td {
          height: 3.333rem;
        }
        .attr th,
        .attr td {
          padding: 0 0.625rem;
          text-align: left;
        }
        .attr th {
          height: 2.5rem;
          color: var(--theme-color-background-400);
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0;
          background: var(--theme-color-background-900);
          border-bottom: 1px solid var(--theme-color-border-1000);
          border-top: 1px solid var(--theme-color-border-1000);
        }
        .attr th:nth-child(1) {
          border-bottom: 1px solid var(--theme-color-border-1000);
          border-left: 1px solid var(--theme-color-border-1000);
          border-radius: 4px 0 0 4px;
          border-top: 1px solid var(--theme-color-border-1000);
        }
        .attr th:last-child {
          border-bottom: 1px solid var(--theme-color-border-1000);
          border-radius: 0 4px 4px 0;
          border-right: 1px solid var(--theme-color-border-1000);
          border-top: 1px solid var(--theme-color-border-1000);
        }
        .attr tr td {
          border-bottom: 1px solid var(--theme-color-border-1000);
          color: var(--theme-color-background-300);
          font-size: 0.875rem;
          height: 2.5rem;
        }
        .attr td:nth-child(1) {
          border-left: 1px solid transparent;
        }
        @media only screen and (max-width: ${layout.breakpointMobile}) {
          .attr {
            overflow-x: scroll;
          }
          .attr::-webkit-scrollbar {
            width: 0;
            height: 0;
            background-color: transparent;
          }
        }
      `}</style>
    </Card>
  );
};

export default AttributesTable;
