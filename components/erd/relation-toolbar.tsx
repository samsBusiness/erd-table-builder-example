'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RelationEdge } from '@/types/erd';

interface RelationToolbarProps {
  selectedEdge: RelationEdge | null;
  onRelationTypeChange: (type: RelationEdge['data']['relationType']) => void;
}

export function RelationToolbar({
  selectedEdge,
  onRelationTypeChange,
}: RelationToolbarProps) {
  if (!selectedEdge) return null;

  return (
    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
      <span className="text-sm font-medium">Relation Type:</span>
      <Select
        value={selectedEdge.data.relationType}
        onValueChange={(value) =>
          onRelationTypeChange(value as RelationEdge['data']['relationType'])
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oneToOne">One-to-One</SelectItem>
          <SelectItem value="oneToMany">One-to-Many</SelectItem>
          <SelectItem value="manyToOne">Many-to-One</SelectItem>
          <SelectItem value="manyToMany">Many-to-Many</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}