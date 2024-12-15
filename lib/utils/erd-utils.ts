import { TableNodeData } from '@/types/erd';

export const calculateNewPosition = (existingNodes: TableNodeData[]) => {
  const offset = 50;
  const basePosition = { x: 100, y: 100 };
  
  if (existingNodes.length === 0) return basePosition;
  
  return {
    x: basePosition.x + (existingNodes.length * offset),
    y: basePosition.y + (existingNodes.length * offset),
  };
};