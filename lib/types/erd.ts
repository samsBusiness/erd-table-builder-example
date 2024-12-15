import { TableData } from './table';

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