import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

// Path Node Component
const PathNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-blue-500' : ''} bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 bg-blue-500" 
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
        className="w-2 h-2 bg-blue-500" 
      />
    </div>
  );
};

export default memo(PathNode);
