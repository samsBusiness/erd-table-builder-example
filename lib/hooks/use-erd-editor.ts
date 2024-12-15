'use client';

import { useCallback } from 'react';
import { Connection, Edge, Node } from 'reactflow';
import { useSchemaStore } from '@/lib/stores/schema-store';
import { TableData } from '@/types/table';

export function useErdEditor() {
  const {
    tables,
    edges,
    selectedTable,
    selectedEdge,
    addTable,
    updateTable,
    selectTable,
    addEdge,
    updateEdge,
    selectEdge,
    saveSchema,
    loadSchema,
    clearSelection,
  } = useSchemaStore();

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    selectTable(node.id);
  }, [selectTable]);

  const handleEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    selectEdge(edge);
  }, [selectEdge]);

  const handlePaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const handleConnect = useCallback((params: Connection) => {
    addEdge(params);
  }, [addEdge]);

  const handleRelationTypeChange = useCallback((type: 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany') => {
    if (!selectedEdge) return;
    updateEdge(selectedEdge.id, { relationType: type });
  }, [selectedEdge, updateEdge]);

  const handleAddTable = useCallback(() => {
    const newTableData: TableData = {
      label: `Table ${tables.length + 1}`,
      columns: [
        { name: 'id', type: 'int', isPrimary: true },
        { name: 'created_at', type: 'timestamp', isPrimary: false },
      ],
    };
    addTable(newTableData);
  }, [tables.length, addTable]);

  return {
    tables,
    edges,
    selectedTable,
    selectedEdge,
    handleNodeClick,
    handleEdgeClick,
    handlePaneClick,
    handleConnect,
    handleRelationTypeChange,
    handleAddTable,
    updateTable,
    saveSchema,
    loadSchema,
  };
}