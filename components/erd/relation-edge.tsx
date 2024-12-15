'use client';

import { BaseEdge, EdgeProps, getBezierPath } from 'reactflow';
import { RelationEdge } from '@/types/erd';

const RELATION_SYMBOLS = {
  oneToOne: ['|', '|'],
  oneToMany: ['|', '∞'],
  manyToOne: ['∞', '|'],
  manyToMany: ['∞', '∞'],
} as const;

export function RelationEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: EdgeProps<RelationEdge['data']>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const symbols = RELATION_SYMBOLS[data?.relationType || 'oneToOne'];

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <text
        x={sourceX + 10}
        y={sourceY}
        className="fill-current text-sm"
        dominantBaseline="central"
      >
        {symbols[0]}
      </text>
      <text
        x={targetX - 20}
        y={targetY}
        className="fill-current text-sm"
        dominantBaseline="central"
      >
        {symbols[1]}
      </text>
    </>
  );
}