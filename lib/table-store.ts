import { create } from 'zustand';
import { TableData, TableNodeData } from '@/types/erd';

interface TableStore {
  tables: TableNodeData[];
  selectedTable: string | null;
  addTable: (table: TableData) => void;
  updateTable: (id: string, data: TableData) => void;
  selectTable: (id: string | null) => void;
  getTables: () => TableNodeData[];
}

export const useTableStore = create<TableStore>((set, get) => ({
  tables: [],
  selectedTable: null,

  addTable: (table: TableData) => {
    set((state) => {
      const newId = `table-${state.tables.length + 1}`;
      const position = {
        x: 100 + (state.tables.length * 50),
        y: 100 + (state.tables.length * 50),
      };
      
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
    set({ selectedTable: id });
  },

  getTables: () => get().tables,
}));