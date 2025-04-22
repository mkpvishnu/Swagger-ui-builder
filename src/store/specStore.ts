import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Edge, Connection } from 'reactflow';
import { v4 as uuidv4 } from '../utils/uuid';

export type OpenAPIObject = {
  openapi: string;
  info: {
    title: string;
    description?: string;
    version: string;
    [key: string]: any;
  };
  paths?: Record<string, any>;
  components?: Record<string, any>;
  [key: string]: any;
};

export type NodeData = {
  type: 'path' | 'operation' | 'model' | 'parameter' | 'response' | 'securityScheme';
  label: string;
  specPath: string[];
  properties?: Record<string, any>;
};

interface SpecState {
  spec: OpenAPIObject;
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | null;
  
  // Actions
  initializeSpec: () => void;
  setNodes: (nodes: Node<NodeData>[]) => void;
  addNode: (node: Node<NodeData>) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  removeNode: (nodeId: string) => void;
  setEdges: (edges: Edge[]) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  onConnect: (connection: Connection) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
  exportSpec: () => OpenAPIObject;
}

// Default OpenAPI specification template
const defaultSpec: OpenAPIObject = {
  openapi: '3.0.3',
  info: {
    title: 'New API',
    description: 'API description',
    version: '1.0.0',
  },
  paths: {
    '/ping': {
      get: {
        summary: 'Server health check',
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const useSpecStore = create<SpecState>()(
  persist(
    (set, get) => ({
      spec: defaultSpec,
      nodes: [],
      edges: [],
      selectedNode: null,

      initializeSpec: () => {
        set({ spec: defaultSpec });
      },
      
      setNodes: (nodes) => set({ nodes }),
      
      addNode: (node) => {
        const nodes = [...get().nodes];
        nodes.push({
          ...node,
          id: node.id || uuidv4()
        });
        set({ nodes });
      },
      
      updateNode: (nodeId, data) => {
        const nodes = get().nodes.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data
              }
            };
          }
          return node;
        });
        set({ nodes });
      },
      
      removeNode: (nodeId) => {
        const nodes = get().nodes.filter(node => node.id !== nodeId);
        const edges = get().edges.filter(
          edge => edge.source !== nodeId && edge.target !== nodeId
        );
        set({ nodes, edges });
        
        // If the deleted node was selected, clear selection
        if (get().selectedNode?.id === nodeId) {
          set({ selectedNode: null });
        }
      },
      
      setEdges: (edges) => set({ edges }),
      
      addEdge: (edge) => {
        const edges = [...get().edges];
        edges.push({
          ...edge,
          id: edge.id || uuidv4()
        });
        set({ edges });
      },
      
      removeEdge: (edgeId) => {
        const edges = get().edges.filter(edge => edge.id !== edgeId);
        set({ edges });
      },
      
      onConnect: (connection) => {
        // Check if connection is valid
        if (!connection.source || !connection.target) return;
        
        // Find source and target nodes
        const sourceNode = get().nodes.find(node => node.id === connection.source);
        const targetNode = get().nodes.find(node => node.id === connection.target);
        
        if (!sourceNode || !targetNode) return;
        
        // Check for valid connections based on node types
        let isValid = false;
        
        // Path -> Operation
        if (sourceNode.data.type === 'path' && targetNode.data.type === 'operation') {
          isValid = true;
        }
        // Operation -> Parameter or Response
        else if (sourceNode.data.type === 'operation' && 
                (targetNode.data.type === 'parameter' || targetNode.data.type === 'response')) {
          isValid = true;
        }
        // Parameter -> Model
        else if (sourceNode.data.type === 'parameter' && targetNode.data.type === 'model') {
          isValid = true;
        }
        // Response -> Model
        else if (sourceNode.data.type === 'response' && targetNode.data.type === 'model') {
          isValid = true;
        }
        
        if (isValid) {
          const newEdge: Edge = {
            id: uuidv4(),
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            animated: true,
          };
          
          set({ edges: [...get().edges, newEdge] });
        }
      },
      
      setSelectedNode: (node) => {
        set({ selectedNode: node });
      },
      
      exportSpec: () => {
        // This is a placeholder implementation
        // In the real implementation, we would build the spec from nodes and edges
        return get().spec;
      }
    }),
    {
      name: 'swagger-builder-spec'
    }
  )
);
