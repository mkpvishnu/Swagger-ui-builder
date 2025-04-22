import React from 'react';
import { useSpecStore } from '../../store/specStore';
import PathProperties from './properties/PathProperties';
import OperationProperties from './properties/OperationProperties';
import ModelProperties from './properties/ModelProperties';
import ParameterProperties from './properties/ParameterProperties';
import ResponseProperties from './properties/ResponseProperties';
import SecuritySchemeProperties from './properties/SecuritySchemeProperties';

const PropertyInspector: React.FC = () => {
  const { selectedNode, updateNode, removeNode } = useSpecStore();
  
  if (!selectedNode) {
    return (
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="p-4 text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2 text-center">Select a node to view and edit its properties</p>
        </div>
      </div>
    );
  }
  
  const renderPropertiesForm = () => {
    switch (selectedNode.data.type) {
      case 'path':
        return <PathProperties node={selectedNode} updateNode={updateNode} />;
      case 'operation':
        return <OperationProperties node={selectedNode} updateNode={updateNode} />;
      case 'model':
        return <ModelProperties node={selectedNode} updateNode={updateNode} />;
      case 'parameter':
        return <ParameterProperties node={selectedNode} updateNode={updateNode} />;
      case 'response':
        return <ResponseProperties node={selectedNode} updateNode={updateNode} />;
      case 'securityScheme':
        return <SecuritySchemeProperties node={selectedNode} updateNode={updateNode} />;
      default:
        return (
          <div className="p-4 text-gray-500 dark:text-gray-400">
            No properties editor available for this node type.
          </div>
        );
    }
  };
  
  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Properties</h3>
        <button 
          onClick={() => removeNode(selectedNode.id)}
          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          title="Delete Node"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex space-x-2 items-center">
          <div className={`w-3 h-3 rounded-full ${getNodeTypeColor(selectedNode.data.type)}`}></div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getNodeTypeName(selectedNode.data.type)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {selectedNode.id}
          </div>
        </div>
        
        {renderPropertiesForm()}
      </div>
    </div>
  );
};

// Helper function to get a color for node type
const getNodeTypeColor = (type: string): string => {
  switch (type) {
    case 'path':
      return 'bg-blue-500';
    case 'operation':
      return 'bg-green-500';
    case 'model':
      return 'bg-purple-500';
    case 'parameter':
      return 'bg-yellow-500';
    case 'response':
      return 'bg-red-500';
    case 'securityScheme':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

// Helper function to get a display name for node type
const getNodeTypeName = (type: string): string => {
  switch (type) {
    case 'path':
      return 'Path';
    case 'operation':
      return 'Operation';
    case 'model':
      return 'Model';
    case 'parameter':
      return 'Parameter';
    case 'response':
      return 'Response';
    case 'securityScheme':
      return 'Security Scheme';
    default:
      return 'Unknown';
  }
};

export default PropertyInspector;
