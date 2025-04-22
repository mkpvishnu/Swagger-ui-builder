import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

const SimplePathNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-blue-500' : ''} bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        id="target-top"
        className="w-3 h-3 bg-blue-500 border-2 border-white" 
        isConnectable={true}
      />
      
      <div className="w-48">
        <div className="font-mono text-blue-800 dark:text-blue-300 text-sm font-medium">
          {data.label}
        </div>
        
        {data.properties?.summary && (
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 truncate">
            {data.properties.summary}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="source-bottom"
        className="w-3 h-3 bg-blue-500 border-2 border-white" 
        isConnectable={true}
      />
    </div>
  );
};

export default memo(SimplePathNode);
