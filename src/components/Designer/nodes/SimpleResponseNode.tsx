import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

// Get color based on status code
const getStatusColor = (status: string): string => {
  const code = parseInt(status, 10);
  if (code >= 200 && code < 300) return 'bg-green-500 text-white';
  if (code >= 300 && code < 400) return 'bg-blue-500 text-white';
  if (code >= 400 && code < 500) return 'bg-yellow-500 text-white';
  if (code >= 500) return 'bg-red-500 text-white';
  return 'bg-gray-500 text-white';
};

const SimpleResponseNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  const statusCode = data.properties?.statusCode || '200';
  const statusColor = getStatusColor(statusCode);
  
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-teal-500' : ''} bg-teal-50 dark:bg-teal-900 border border-teal-200 dark:border-teal-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        id="target-top"
        className="w-3 h-3 bg-teal-500 border-2 border-white" 
        isConnectable={true}
      />
      
      <div className="w-48">
        <div className="flex items-center space-x-2">
          <div className={`text-xs font-bold px-2 py-1 rounded ${statusColor}`}>
            {statusCode}
          </div>
          
          <div className="font-medium text-teal-800 dark:text-teal-300 truncate">
            Response
          </div>
        </div>
        
        {data.properties?.description && (
          <div className="text-xs text-teal-600 dark:text-teal-400 mt-1 truncate">
            {data.properties.description}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="source-bottom"
        className="w-3 h-3 bg-teal-500 border-2 border-white" 
        isConnectable={true}
      />
    </div>
  );
};

export default memo(SimpleResponseNode);
