import { TableNodeData } from '@/types/erd';

export const createTableNode = (id: number, position: { x: number; y: number }): TableNodeData => ({
  id: `table-${id}`,
  type: 'tableNode',
  position,
  data: {
    label: `Table ${id}`,
    columns: [
      { name: 'id', type: 'int', isPrimary: true },
      { name: 'created_at', type: 'timestamp', isPrimary: false },
    ],
  },
});

export const calculateNewPosition = (existingNodes: TableNodeData[]) => {
  const offset = 50;
  const basePosition = { x: 100, y: 100 };
  
  if (existingNodes.length === 0) return basePosition;
  
  return {
    x: basePosition.x + (existingNodes.length * offset),
    y: basePosition.y + (existingNodes.length * offset),
  };
};