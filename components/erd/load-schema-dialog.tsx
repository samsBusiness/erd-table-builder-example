'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SavedSchema } from '@/types/erd';
import { getSavedSchemas, deleteSchema } from '@/lib/storage-utils';
import { Download, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface LoadSchemaDialogProps {
  onLoad: (schema: SavedSchema) => void;
}

export function LoadSchemaDialog({ onLoad }: LoadSchemaDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [schemas, setSchemas] = useState<SavedSchema[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSchemas(getSavedSchemas());
    }
  }, [isOpen]);

  const handleDelete = (timestamp: number) => {
    deleteSchema(timestamp);
    setSchemas(getSavedSchemas());
  };

  const handleLoad = (schema: SavedSchema) => {
    onLoad(schema);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Load Schema
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Schema</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {schemas.length === 0 ? (
            <p className="text-center text-muted-foreground">No saved schemas found</p>
          ) : (
            <div className="space-y-2">
              {schemas.map((schema) => (
                <div
                  key={schema.timestamp}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{schema.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(schema.timestamp, 'PPpp')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(schema.timestamp)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleLoad(schema)}>Load</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}