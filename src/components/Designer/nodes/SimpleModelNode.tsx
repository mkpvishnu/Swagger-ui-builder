import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

const SimpleModelNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  const properties = data.properties?.properties || {};
  const propertyCount = Object.keys(properties).length;
  
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-purple-500' : ''} bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 bg-purple-500" 
      />
      
      <div className="w-48">
        <div className="font-medium text-purple-800 dark:text-purple-300">
          {data.properties?.name || data.label}
        </div>
        
        <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
          <span className="bg-purple-200 dark:bg-purple-700 px-1 py-0.5 rounded">
            {data.properties?.type || 'object'}
          </span>
          {propertyCount > 0 && (
            <span className="ml-2 text-xs">
              {propertyCount} {propertyCount === 1 ? 'property' : 'properties'}
            </span>
          )}
        </div>
        
        {propertyCount > 0 && (
          <div className="mt-2 border-t border-purple-200 dark:border-purple-700 pt-1">
            <div className="flex flex-col space-y-1 text-xs text-purple-600 dark:text-purple-400">
              {Object.entries(properties).slice(0, 3).map(([name, prop]) => (
                <div key={name} className="flex items-center">
                  <span className="font-mono">{name}</span>
                  <span className="ml-1 opacity-50">: {typeof prop === 'object' ? prop.type : typeof prop}</span>
                </div>
              ))}
              {propertyCount > 3 && (
                <div className="text-xs italic opacity-75">
                  + {propertyCount - 3} more properties
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 bg-purple-500" 
      />
    </div>
  );
};

export default memo(SimpleModelNode);
