import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

// Parameter Node Component
const ParameterNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-yellow-500' : ''} bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 bg-yellow-500" 
      />
      
      <div className="w-48">
        <div className="font-medium text-yellow-800 dark:text-yellow-300">
          {data.properties?.name || data.label}
        </div>
        
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs bg-yellow-200 dark:bg-yellow-700 px-1 py-0.5 rounded text-yellow-600 dark:text-yellow-400">
            {data.properties?.in || 'query'}
          </span>
          
          {data.properties?.required && (
            <span className="text-xs bg-red-100 dark:bg-red-900 px-1 py-0.5 rounded text-red-600 dark:text-red-400">
              required
            </span>
          )}
          
          {data.properties?.schema?.type && (
            <span className="text-xs text-yellow-600 dark:text-yellow-400">
              {data.properties.schema.type}
            </span>
          )}
        </div>
        
        {data.properties?.description && (
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 truncate">
            {data.properties.description}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 bg-yellow-500" 
      />
    </div>
  );
};

export default memo(ParameterNode);
