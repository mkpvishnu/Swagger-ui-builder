import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

// Security Scheme Node Component
const SecuritySchemeNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-gray-500' : ''} bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 bg-gray-500" 
      />
      
      <div className="w-48">
        <div className="font-medium text-gray-800 dark:text-gray-300">
          {data.label}
        </div>
        
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          <span className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
            {data.properties?.type || 'http'}
          </span>
          
          {data.properties?.scheme && (
            <span className="ml-1">
              {data.properties.scheme}
            </span>
          )}
        </div>
        
        {data.properties?.description && (
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
            {data.properties.description}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 bg-gray-500" 
      />
    </div>
  );
};

export default memo(SecuritySchemeNode);
