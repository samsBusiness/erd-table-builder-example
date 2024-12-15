'use client';

import { create } from 'zustand';
import { Connection, Edge, Node } from 'reactflow';
import { TableData, TableNodeData, RelationEdge, SavedSchema } from '@/types/erd';
import { calculateNewPosition } from '@/lib/utils/erd-utils';
import { saveSchema as saveSchemaToStorage } from '@/lib/utils/storage-utils';

interface SchemaState {
  tables: TableNodeData[];
  selectedTable: string | null;
  edges: RelationEdge[];
  selectedEdge: RelationEdge | null;

  // Table Actions
  addTable: (table: TableData) => void;
  updateTable: (id: string, data: TableData) => void;
  selectTable: (id: string | null) => void;
  setTables: (tables: TableNodeData[]) => void;
  getTableById: (id: string) => TableNodeData | undefined;
  
  // Edge Actions
  addEdge: (connection: Connection) => void;
  updateEdge: (id: string, data: RelationEdge['data']) => void;
  selectEdge: (edge: RelationEdge | null) => void;
  setEdges: (edges: RelationEdge[]) => void;
  
  // Schema Actions
  saveSchema: (name: string) => void;
  loadSchema: (schema: SavedSchema) => void;
  clearSelection: () => void;
}

export const useSchemaStore = create<SchemaState>((set, get) => ({
  tables: [],
  selectedTable: null,
  edges: [],
  selectedEdge: null,

  addTable: (table: TableData) => {
    set((state) => {
      const newId = `table-${state.tables.length + 1}`;
      const position = calculateNewPosition(state.tables);
      
      const newTable: TableNodeData = {
        id: newId,
        type: 'tableNode',
        position,
        data: table,
      };
      
      return { tables: [...state.tables, newTable] };
    });
  },

  updateTable: (id: string, data: TableData) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === id ? { ...table, data } : table
      ),
    }));
  },

  selectTable: (id: string | null) => {
    set({ selectedTable: id, selectedEdge: null });
  },

  setTables: (tables: TableNodeData[]) => {
    set({ tables });
  },

  getTableById: (id: string) => {
    return get().tables.find((table) => table.id === id);
  },

  addEdge: (connection: Connection) => {
    set((state) => {
      const newEdge: RelationEdge = {
        id: `e${state.edges.length + 1}`,
        source: connection.source || '',
        target: connection.target || '',
        sourceHandle: connection.sourceHandle || '',
        targetHandle: connection.targetHandle || '',
        type: 'relation',
        data: {
          relationType: 'oneToOne',
        },
      };
      return { edges: [...state.edges, newEdge] };
    });
  },

  updateEdge: (id: string, data: RelationEdge['data']) => {
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === id ? { ...edge, data } : edge
      ),
    }));
  },

  selectEdge: (edge: RelationEdge | null) => {
    set({ selectedEdge: edge, selectedTable: null });
  },

  setEdges: (edges: RelationEdge[]) => {
    set({ edges });
  },

  saveSchema: (name: string) => {
    const { tables, edges } = get();
    const schema: SavedSchema = {
      nodes: tables,
      edges,
      name,
      timestamp: Date.now(),
    };
    saveSchemaToStorage(schema);
  },

  loadSchema: (schema: SavedSchema) => {
    set({
      tables: schema.nodes,
      edges: schema.edges,
      selectedTable: null,
      selectedEdge: null,
    });
  },

  clearSelection: () => {
    set({ selectedTable: null, selectedEdge: null });
  },
}));