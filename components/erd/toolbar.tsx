'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { SaveSchemaDialog } from './save-schema-dialog';
import { LoadSchemaDialog } from './load-schema-dialog';
import { SavedSchema } from '@/types/erd';

interface ToolbarProps {
  onAddTable: () => void;
  onSave: (name: string) => void;
  onLoad: (schema: SavedSchema) => void;
}

export function Toolbar({ onAddTable, onSave, onLoad }: ToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <Button onClick={onAddTable}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Table
      </Button>
      <SaveSchemaDialog onSave={onSave} />
      <LoadSchemaDialog onLoad={onLoad} />
    </div>
  );
}