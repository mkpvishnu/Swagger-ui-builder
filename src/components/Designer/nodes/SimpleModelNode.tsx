import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

const SimpleModelNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-purple-500' : ''} bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        id="target-top"
        className="w-3 h-3 bg-purple-500 border-2 border-white" 
        isConnectable={true}
      />
      
      <div className="w-48">
        <div className="flex items-center space-x-1">
          <div className="text-xs px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200">
            Model
          </div>
          <div className="font-mono text-purple-800 dark:text-purple-300 text-sm font-medium truncate">
            {data.properties?.name || data.label}
          </div>
        </div>
        
        {data.properties?.type && (
          <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            {data.properties.type}
          </div>
        )}
        
        {data.properties?.properties && (
          <div className="mt-2 border-t border-purple-200 dark:border-purple-700 pt-1">
            <div className="text-xs text-purple-600 dark:text-purple-400">
              Properties: {Object.keys(data.properties.properties).length}
            </div>
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="source-bottom"
        className="w-3 h-3 bg-purple-500 border-2 border-white" 
        isConnectable={true}
      />
    </div>
  );
};

export default memo(SimpleModelNode);
