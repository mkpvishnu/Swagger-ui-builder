import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  Connection,
  Edge,
  NodeTypes,
  EdgeTypes,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  NodeDragHandler,
  OnConnect,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSpecStore, NodeData } from '../../store/specStore';
import { v4 as uuidv4 } from '../../utils/uuid';

// Import custom node components
import PathNode from './nodes/PathNode';
import OperationNode from './nodes/OperationNode';
import ModelNode from './nodes/ModelNode';
import ParameterNode from './nodes/ParameterNode';
import ResponseNode from './nodes/ResponseNode';
import SecuritySchemeNode from './nodes/SecuritySchemeNode';

// Define custom node types
const nodeTypes: NodeTypes = {
  path: PathNode,
  operation: OperationNode,
  model: ModelNode,
  parameter: ParameterNode,
  response: ResponseNode,
  securityScheme: SecuritySchemeNode,
};

const VisualDesigner: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, setNodes, setEdges, addNode, setSelectedNode } = useSpecStore();
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Handle nodes changes (position, selection, removal)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  // Handle edges changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  // Handle connection between nodes
  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges(addEdge({ ...params, id: uuidv4() }, edges));
    },
    [edges, setEdges]
  );

  // Handle dropping new nodes from the sidebar
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Get the element data from the drag event
      const nodeType = event.dataTransfer.getData('application/reactflow');
      
      if (!nodeType || !reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }

      // Get the position where the element was dropped
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create a new node with the right type and basic properties
      const newNode = {
        id: uuidv4(),
        type: nodeType,
        position,
        data: {
          type: nodeType,
          label: getDefaultLabelForType(nodeType),
          specPath: [],
          properties: getDefaultPropertiesForType(nodeType),
        } as NodeData,
      };

      // Add the node to the store
      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  // Handle node selection
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: any) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // Handle drag over event for the canvas
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Get default label for a node type
  const getDefaultLabelForType = (type: string): string => {
    switch (type) {
      case 'path':
        return '/new-path';
      case 'operation':
        return 'GET';
      case 'model':
        return 'NewModel';
      case 'parameter':
        return 'param';
      case 'response':
        return '200';
      case 'securityScheme':
        return 'Auth';
      default:
        return 'New Node';
    }
  };

  // Get default properties for a node type
  const getDefaultPropertiesForType = (type: string): Record<string, any> => {
    switch (type) {
      case 'path':
        return {
          path: '/new-path',
          summary: '',
          description: '',
        };
      case 'operation':
        return {
          method: 'get',
          operationId: '',
          summary: '',
          description: '',
        };
      case 'model':
        return {
          name: 'NewModel',
          type: 'object',
          properties: {},
        };
      case 'parameter':
        return {
          name: 'param',
          in: 'query',
          required: false,
          schema: {
            type: 'string',
          },
        };
      case 'response':
        return {
          statusCode: '200',
          description: 'Successful operation',
          content: {},
        };
      case 'securityScheme':
        return {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        };
      default:
        return {};
    }
  };

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
        <Panel position="top-right">
          <button
            className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              if (reactFlowInstance) {
                reactFlowInstance.fitView();
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default VisualDesigner;
