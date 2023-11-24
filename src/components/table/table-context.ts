'use client';
import React from 'react';
import { TableAbstractColumn, TableDataItemBase } from './table-types';

export interface TableConfig<T extends TableDataItemBase> {
  columns: Array<TableAbstractColumn<T>>;
  updateColumn: (column: TableAbstractColumn<T>) => void;
  deleteColumn: (prop: keyof T) => void;
}

const defaultContext = {
  columns: [],
  updateColumn: () => {},
  deleteColumn: () => {},
};

export const TableContext = React.createContext<TableConfig<any>>(defaultContext);

export const useTableContext = <T extends TableDataItemBase>(): TableConfig<T> => React.useContext<TableConfig<T>>(TableContext);
