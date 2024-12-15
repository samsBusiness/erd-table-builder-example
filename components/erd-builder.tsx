'use client';

import { ReactFlow, ReactFlowProvider } from 'reactflow';
import { FlowCanvas } from './erd/flow-canvas';

export function ERDBuilder() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}