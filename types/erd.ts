import { ColumnType } from '@/lib/constants';

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

export interface TableNodeData {
  id: string;
  type: 'tableNode';
  position: { x: number; y: number };
  data: TableData;
}

export interface RelationEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type: 'relation';
  data: {
    relationType: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany';
  };
}

export interface SavedSchema {
  nodes: TableNodeData[];
  edges: RelationEdge[];
  name: string;
  timestamp: number;
}