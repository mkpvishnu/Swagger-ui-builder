import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

// Get a color based on operation method
const getMethodColor = (method: string): string => {
  switch (method.toLowerCase()) {
    case 'get':
      return 'bg-green-500';
    case 'post':
      return 'bg-blue-500';
    case 'put':
      return 'bg-yellow-500';
    case 'delete':
      return 'bg-red-500';
    case 'patch':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

// Operation Node Component
const OperationNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  const method = data.properties?.method || 'get';
  const methodColor = getMethodColor(method);
  
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-green-500' : ''} bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 bg-green-500" 
      />
      
      <div className="w-48">
        <div className="flex items-center space-x-2">
          <div className={`text-xs uppercase font-bold text-white px-2 py-1 rounded ${methodColor}`}>
            {method}
          </div>
          
          <div className="font-medium text-green-800 dark:text-green-300 truncate">
            {data.properties?.operationId || data.label}
          </div>
        </div>
        
        {data.properties?.summary && (
          <div className="text-xs text-green-600 dark:text-green-400 mt-1 truncate">
            {data.properties.summary}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-2 h-2 bg-green-500" 
        id="response"
      />
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 bg-green-500" 
        id="parameter"
      />
    </div>
  );
};

export default memo(OperationNode);
