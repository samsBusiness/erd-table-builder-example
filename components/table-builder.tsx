'use client';

import { useTableEditor } from '@/lib/hooks/use-table-editor';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { COLUMN_TYPES } from '@/lib/constants';

export function TableBuilder() {
  const {
    selectedTableId,
    setSelectedTableId,
    tableName,
    setTableName,
    columns,
    resetForm,
    addColumn,
    removeColumn,
    updateColumn,
    handleSave,
    tables,
  } = useTableEditor();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Select Table</label>
            <Select
              value={selectedTableId || "new"}
              onValueChange={(value) => {
                if (value === "new") {
                  resetForm();
                } else {
                  setSelectedTableId(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a table to edit or create new" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Create New Table</SelectItem>
                {tables.map((table) => (
                  <SelectItem key={table.id} value={table.id}>
                    {table.data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={resetForm}>
            New Table
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex-1 mr-4">
            <label className="text-sm font-medium">Table Name</label>
            <Input
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name"
              className="mt-1"
            />
          </div>
          <Button onClick={handleSave} className="mt-6">
            <Save className="mr-2 h-4 w-4" />
            {selectedTableId ? 'Update Table' : 'Create Table'}
          </Button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Columns</h3>
            <Button onClick={addColumn}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Column
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Primary Key</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((column, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={column.name}
                      onChange={(e) => updateColumn(index, 'name', e.target.value)}
                      placeholder="Column name"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={column.type}
                      onValueChange={(value) => updateColumn(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COLUMN_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={column.isPrimary}
                      onChange={(e) => updateColumn(index, 'isPrimary', e.target.checked)}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeColumn(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}