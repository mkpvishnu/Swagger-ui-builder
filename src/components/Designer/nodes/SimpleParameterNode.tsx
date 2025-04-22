import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

const SimpleParameterNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-orange-500' : ''} bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        id="target-top"
        className="w-3 h-3 bg-orange-500 border-2 border-white" 
        isConnectable={true}
      />
      
      <div className="w-48">
        <div className="flex items-center space-x-1">
          <div className={`text-xs px-1.5 py-0.5 rounded ${data.properties?.required ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200' : 'bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200'}`}>
            {data.properties?.in || 'query'}
          </div>
          
          <div className="font-mono text-orange-800 dark:text-orange-300 text-sm font-medium truncate">
            {data.properties?.name || data.label}
          </div>
        </div>
        
        {data.properties?.schema?.type && (
          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
            Type: {data.properties.schema.type}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="source-bottom"
        className="w-3 h-3 bg-orange-500 border-2 border-white" 
        isConnectable={true}
      />
    </div>
  );
};

export default memo(SimpleParameterNode);
