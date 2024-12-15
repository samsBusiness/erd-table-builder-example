'use client';

import { useState, useEffect } from 'react';
import { Column } from '@/types/table';
import { useSchemaStore } from '@/lib/stores/schema-store';

export function useTableEditor() {
  const { addTable, updateTable, tables, selectedTable, selectTable, getTableById } = useSchemaStore();
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState<Column[]>([
    { name: 'id', type: 'int', isPrimary: true }
  ]);

  useEffect(() => {
    if (selectedTable) {
      const table = getTableById(selectedTable);
      if (table) {
        setTableName(table.data.label);
        setColumns(table.data.columns);
      }
    }
  }, [selectedTable, getTableById]);

  const resetForm = () => {
    selectTable(null);
    setTableName('');
    setColumns([{ name: 'id', type: 'int', isPrimary: true }]);
  };

  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'varchar', isPrimary: false }]);
  };

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index: number, field: keyof Column, value: string | boolean) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
  };

  const handleSave = () => {
    if (!tableName.trim() || columns.length === 0) return;

    const tableData = {
      label: tableName,
      columns,
    };

    if (selectedTable) {
      updateTable(selectedTable, tableData);
    } else {
      addTable(tableData);
    }

    resetForm();
  };

  return {
    selectedTableId: selectedTable,
    setSelectedTableId: selectTable,
    tableName,
    setTableName,
    columns,
    resetForm,
    addColumn,
    removeColumn,
    updateColumn,
    handleSave,
    tables,
  };
}