'use client';
import React, { useEffect } from 'react';
import { useTableContext } from './table-context';
import useWarning from '../utils/use-warning';
import { TableColumnRender, TableDataItemBase } from './table-types';

export type TableColumnProps<TableDataItem extends TableDataItemBase> = {
  prop: keyof TableDataItem;
  label?: string;
  w?: number;
  className?: string;
  render?: TableColumnRender<TableDataItem>;
};

const defaultRenderHandler = () => {};

const TableColumn = <TableDataItem extends TableDataItemBase>(columnProps: React.PropsWithChildren<TableColumnProps<TableDataItem>>) => {
  const {
    children,
    prop,
    label,
    w,
    className = '',
    render: renderHandler = defaultRenderHandler,
  } = columnProps as React.PropsWithChildren<TableColumnProps<TableDataItem>>;
  const { updateColumn, deleteColumn } = useTableContext<TableDataItem>();
  const safeProp = `${String(prop)}`.trim();
  if (!safeProp) {
    useWarning('The props "prop" is required.', 'Table.Column');
  }

  useEffect(() => {
    updateColumn({
      label: children || label,
      prop: safeProp,
      w,
      className,
      renderHandler,
    });
  }, [children, label, safeProp, w, className, renderHandler]);

  useEffect(() => {
    return () => {
      deleteColumn(safeProp);
    };
  }, []);

  return null;
};

TableColumn.displayName = 'HimalayaTableColumn';
export default TableColumn;
