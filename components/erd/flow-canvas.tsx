'use client';

import ReactFlow, { Background, Controls, Panel } from 'reactflow';
import { TableNode } from './table-node';
import { RelationEdgeComponent } from './relation-edge';
import { RelationToolbar } from './relation-toolbar';
import { Toolbar } from './toolbar';
import { useErdEditor } from '@/lib/hooks/use-erd-editor';
import 'reactflow/dist/style.css';

const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  relation: RelationEdgeComponent,
};

export function FlowCanvas() {
  const {
    tables,
    edges,
    selectedEdge,
    handleNodeClick,
    handleEdgeClick,
    handlePaneClick,
    handleConnect,
    handleRelationTypeChange,
    handleAddTable,
    saveSchema,
    loadSchema,
    updateTable,
  } = useErdEditor();

  return (
    <div className="w-full h-full border rounded-lg relative bg-white">
      <ReactFlow
        nodes={tables}
        edges={edges}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable
        nodesConnectable
        snapToGrid
        fitView
      >
        <Panel position="top-left">
          <Toolbar
            onAddTable={handleAddTable}
            onSave={saveSchema}
            onLoad={loadSchema}
          />
        </Panel>
        <Background />
        <Controls />
        <RelationToolbar
          selectedEdge={selectedEdge}
          onRelationTypeChange={handleRelationTypeChange}
        />
      </ReactFlow>
    </div>
  );
}