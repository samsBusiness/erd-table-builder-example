'use client';

import { Handle, Position } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function TableNode({ data }) {
  return (
    <Card className="min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{data.label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {data.columns.map((column, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span>{column.name}</span>
              <div className="flex gap-2">
                <Badge variant="outline">{column.type}</Badge>
                {column.isPrimary && (
                  <Badge variant="secondary">PK</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Handle type="source" position={Position.Right} />
    </Card>
  );
}