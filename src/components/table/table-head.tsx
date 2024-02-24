'use client';
import React, { useMemo } from 'react';
import useLayout from '../use-layout';
import useTheme from '../use-theme';
import { TableAbstractColumn, TableDataItemBase } from './table-types';
import useClasses from '../use-classes';

interface Props<TableDataItem extends TableDataItemBase> {
  w: number;
  columns: Array<TableAbstractColumn<TableDataItem>>;
  className?: string;
  hasBorder?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props<any>>;
export type TableHeadProps<TableDataItem extends TableDataItemBase> = Props<TableDataItem> & NativeAttrs;

const makeColgroup = <TableDataItem extends TableDataItemBase>(w: number, columns: Array<TableAbstractColumn<TableDataItem>>) => {
  const unsetWidthCount = columns.filter(c => !c.w).length;
  const customWidthTotal = columns.reduce((pre, current) => {
    return current.w ? pre + current.w : pre;
  }, 0);
  const averageWidth = (w - customWidthTotal) / unsetWidthCount;
  if (averageWidth <= 0) return <colgroup />;
  return (
    <colgroup>
      {columns.map((column, index) => (
        <col key={`colgroup-${index}`} width={column.w || averageWidth} />
      ))}
    </colgroup>
  );
};

const TableHead = <TableDataItem extends TableDataItemBase>({ hasBorder = true, ...props }: TableHeadProps<TableDataItem>) => {
  const theme = useTheme();
  const layout = useLayout();
  const { columns, w } = props as TableHeadProps<TableDataItem>;
  const isScalableWidth = useMemo(() => columns.find(item => !!item.w), [columns]);
  const colgroup = useMemo(() => {
    if (!isScalableWidth) return <colgroup />;
    return makeColgroup(w, columns);
  }, [isScalableWidth, w]);

  return (
    <>
      {colgroup}
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={`table-th-${String(column.prop)}-${index}`} className={useClasses(column.className, { 'has-border': hasBorder })}>
              <div className="thead-box">{column.label}</div>
            </th>
          ))}
        </tr>
      </thead>
      <style jsx>{`
        thead {
          border-collapse: separate;
          border-spacing: 0;
          font-size: inherit;
        }

        :global(tbody tr:last-child td) {
          border-bottom: 0 !important;
        }

        th {
          padding: ${layout.gapHalf} ${layout.gapQuarter};
          font-size: calc(0.8 * var(--table-font-size));
          font-weight: 600;
          text-align: left;
          letter-spacing: 0;
          vertical-align: middle;
          color: ${theme.palette.accents_5};
          background: transparent;
          border-bottom: 1px solid ${theme.palette.border};
          border-radius: 0;
        }

        th.has-border {
          border-top: 1px solid ${theme.palette.border};
        }

        th.has-border:nth-child(1) {
          border-bottom: 1px solid ${theme.palette.border};
          border-left: 1px solid ${theme.palette.border};
          border-top: 1px solid ${theme.palette.border};
          border-top-left-radius: ${theme.style.radius};
          border-bottom-left-radius: ${theme.style.radius};
        }

        th.has-border:last-child {
          border-bottom: 1px solid ${theme.palette.border};
          border-right: 1px solid ${theme.palette.border};
          border-top: 1px solid ${theme.palette.border};
          border-top-right-radius: ${theme.style.radius};
          border-bottom-right-radius: ${theme.style.radius};
        }

        .thead-box {
          display: flex;
          align-items: center;
          -webkit-box-align: center;
          text-transform: uppercase;
          line-height: calc(1.4 * var(--table-font-size));
        }
      `}</style>
    </>
  );
};

TableHead.displayName = 'HimalayaTableHead';
export default TableHead;
