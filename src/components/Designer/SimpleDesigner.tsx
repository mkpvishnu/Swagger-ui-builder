import React, { useRef, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  NodeTypes,
  useReactFlow,
  Connection,
  Edge,
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useSpecStore, NodeData } from '../../store/specStore';
import SimplePathNode from './nodes/SimplePathNode';
import SimpleOperationNode from './nodes/SimpleOperationNode';
import SimpleModelNode from './nodes/SimpleModelNode';
import SimpleParameterNode from './nodes/SimpleParameterNode';
import SimpleResponseNode from './nodes/SimpleResponseNode';
import { v4 as uuidv4 } from '../../utils/uuid';

// Define custom node types
const nodeTypes: NodeTypes = {
  path: SimplePathNode,
  operation: SimpleOperationNode,
  model: SimpleModelNode,
  parameter: SimpleParameterNode,
  response: SimpleResponseNode
};

const SimpleDesigner: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, addNode, setNodes, setEdges, setSelectedNode, onConnect } = useSpecStore();
  const reactFlowInstance = useReactFlow();
  
  // Handle node changes (position, selection)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );
  
  // Get default properties for a node type
  const getDefaultPropertiesForType = (type: string): Record<string, any> => {
    switch (type) {
      case 'path':
        return {
          path: '/new-path',
          summary: 'New path',
          description: '',
        };
      case 'operation':
        return {
          method: 'get',
          operationId: '',
          summary: 'New operation',
          description: '',
        };
      case 'model':
        return {
          name: 'NewModel',
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' }
          }
        };
      case 'parameter':
        return {
          name: 'parameter',
          in: 'query',
          required: false,
          schema: {
            type: 'string'
          },
          description: ''
        };
      case 'response':
        return {
          statusCode: '200',
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object'
              }
            }
          }
        };
      default:
        return {};
    }
  };
  
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
        return 'parameter';
      case 'response':
        return '200';
      default:
        return 'New Node';
    }
  };
  
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

  // Handle connection between nodes
  const handleConnect = useCallback(
    (params: Connection) => {
      console.log('Connection attempt:', params);
      onConnect(params);
    },
    [onConnect]
  );

  // Handle drag over event for the canvas
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={handleConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ stroke: '#999', strokeWidth: 2 }}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{ type: 'smoothstep', animated: true }}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default SimpleDesigner;
