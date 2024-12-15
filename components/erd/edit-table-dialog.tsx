'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableData } from '@/types/erd';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface EditTableDialogProps {
  data: TableData;
  onSave: (data: TableData) => void;
}

export function EditTableDialog({ data, onSave }: EditTableDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<TableData>(data);

  const handleSave = () => {
    onSave(editData);
    setIsOpen(false);
  };

  const addColumn = () => {
    setEditData({
      ...editData,
      columns: [...editData.columns, { name: '', type: 'varchar', isPrimary: false }],
    });
  };

  const removeColumn = (index: number) => {
    setEditData({
      ...editData,
      columns: editData.columns.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Table</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Table Name</label>
            <Input
              value={editData.label}
              onChange={(e) => setEditData({ ...editData, label: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Columns</label>
              <Button onClick={addColumn} size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Column
              </Button>
            </div>
            
            <div className="space-y-2">
              {editData.columns.map((column, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={column.name}
                    onChange={(e) => {
                      const newColumns = [...editData.columns];
                      newColumns[index] = { ...column, name: e.target.value };
                      setEditData({ ...editData, columns: newColumns });
                    }}
                    placeholder="Column name"
                    className="flex-1"
                  />
                  <Select
                    value={column.type}
                    onValueChange={(value) => {
                      const newColumns = [...editData.columns];
                      newColumns[index] = { ...column, type: value };
                      setEditData({ ...editData, columns: newColumns });
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="varchar">VARCHAR</SelectItem>
                      <SelectItem value="int">INT</SelectItem>
                      <SelectItem value="boolean">BOOLEAN</SelectItem>
                      <SelectItem value="timestamp">TIMESTAMP</SelectItem>
                      <SelectItem value="text">TEXT</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">PK</label>
                    <input
                      type="checkbox"
                      checked={column.isPrimary}
                      onChange={(e) => {
                        const newColumns = [...editData.columns];
                        newColumns[index] = { ...column, isPrimary: e.target.checked };
                        setEditData({ ...editData, columns: newColumns });
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColumn(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}