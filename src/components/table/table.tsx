'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useScale, { withScale } from '../use-scale';
import useRealShape from '../utils/use-real-shape';
import useResize from '../utils/use-resize';
import TableBody from './table-body';
import TableColumn from './table-column';
import { TableConfig, TableContext } from './table-context';
import TableHead from './table-head';
import { TableAbstractColumn, TableDataItemBase, TableOnCellClick, TableOnChange, TableOnRowClick, TableRowClassNameHandler } from './table-types';
import useClasses from '../use-classes';

interface Props<TableDataItem extends TableDataItemBase> {
  data?: Array<TableDataItem>;
  initialData?: Array<TableDataItem>;
  emptyText?: string;
  hover?: boolean;
  onRow?: TableOnRowClick<TableDataItem>;
  onCell?: TableOnCellClick<TableDataItem>;
  onChange?: TableOnChange<TableDataItem>;
  rowClassName?: TableRowClassNameHandler<TableDataItem>;
  hasBorder?: boolean;
}

type NativeAttrs = Omit<React.TableHTMLAttributes<HTMLTableElement>, keyof Props<HTMLTableElement>>;
export type TableProps<TableDataItem extends TableDataItemBase> = Props<TableDataItem> & NativeAttrs;

function TableComponent<TableDataItem extends TableDataItemBase>(tableProps: React.PropsWithChildren<TableProps<TableDataItem>>) {
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const {
    children,
    data: customData,
    initialData = [],
    hover = true,
    hasBorder = true,
    emptyText = '',
    onRow,
    onCell,
    onChange,
    className,
    rowClassName = () => '',
    ...props
  } = tableProps as React.PropsWithChildren<TableProps<TableDataItem>>;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const { UNIT, CLASS_NAMES, SCALE } = useScale();
  const ref = useRef<HTMLTableElement>(null);
  const [{ width }, updateShape] = useRealShape<HTMLTableElement>(ref);
  const [columns, setColumns] = useState<Array<TableAbstractColumn<TableDataItem>>>([]);
  const [data, setData] = useState<Array<TableDataItem>>(initialData);

  const updateColumn = (column: TableAbstractColumn<TableDataItem>) => {
    setColumns(last => {
      const hasColumn = last.find(item => item.prop === column.prop);
      if (!hasColumn) return [...last, column];
      return last.map(item => {
        if (item.prop !== column.prop) return item;
        return column;
      });
    });
  };

  const deleteColumn = (prop: keyof TableDataItem) => {
    setColumns(last => {
      return last.filter(item => item.prop !== prop);
    });
  };

  const contextValue = useMemo<TableConfig<TableDataItem>>(
    () => ({
      columns,
      updateColumn,
      deleteColumn,
    }),
    [columns],
  );

  useEffect(() => {
    if (typeof customData === 'undefined') return;
    setData(customData);
  }, [customData]);

  useResize(() => updateShape());

  return (
    <TableContext.Provider value={contextValue}>
      <table ref={ref} className={useClasses('tbl', className, CLASS_NAMES)} {...props}>
        <TableHead columns={columns} w={width} hasBorder={hasBorder} />
        <TableBody<TableDataItem> data={data} hover={hover} emptyText={emptyText} onRow={onRow} onCell={onCell} rowClassName={rowClassName} />
        {children}

        <style jsx>{`
          .tbl {
            border-collapse: separate;
            border-spacing: 0;
            font-size: var(--table-font-size);
          }

          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'tbl')}
          ${SCALE.w(1, value => `width: ${value};`, '100%', 'tbl')}

          ${SCALE.font(1, value => `--table-font-size: ${value};`, undefined, 'tbl')}

          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tbl')}
          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'tbl')}
          ${UNIT('tbl')}
        `}</style>
      </table>
    </TableContext.Provider>
  );
}

TableComponent.displayName = 'HimalayaTable';
TableComponent.Column = TableColumn;
const Table = withScale(TableComponent) as any;
Table.Column = TableColumn;

export type TableType = typeof Table & {
  Column: typeof TableColumn;
};

export default Table as TableType;
