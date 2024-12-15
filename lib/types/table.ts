import { ColumnType } from '../constants';

export interface Column {
  name: string;
  type: ColumnType;
  isPrimary: boolean;
  isForeignKey?: boolean;
  references?: {
    tableId: string;
    columnId: string;
  };
}

export interface TableData {
  label: string;
  columns: Column[];
}