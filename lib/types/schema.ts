import { TableNodeData, RelationEdge } from './erd';

export interface SavedSchema {
  nodes: TableNodeData[];
  edges: RelationEdge[];
  name: string;
  timestamp: number;
}