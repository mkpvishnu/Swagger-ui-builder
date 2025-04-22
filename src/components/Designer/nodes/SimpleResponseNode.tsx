import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../../../store/specStore';

// Get a color based on status code
const getStatusColor = (status: string): string => {
  const code = parseInt(status);
  if (code >= 200 && code < 300) return 'bg-green-500';
  if (code >= 300 && code < 400) return 'bg-blue-500';
  if (code >= 400 && code < 500) return 'bg-yellow-500';
  if (code >= 500) return 'bg-red-500';
  return 'bg-gray-500';
};

const SimpleResponseNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  const statusCode = data.properties?.statusCode || '200';
  const statusColor = getStatusColor(statusCode);
  
  return (
    <div className={`p-3 rounded-md shadow-md ${selected ? 'ring-2 ring-red-500' : ''} bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 bg-red-500" 
      />
      
      <div className="w-48">
        <div className="flex items-center space-x-2">
          <div className={`text-xs px-2 py-1 rounded text-white font-bold ${statusColor}`}>
            {statusCode}
          </div>
          
          <div className="font-medium text-red-800 dark:text-red-300 truncate">
            {data.properties?.description || 'Response'}
          </div>
        </div>
        
        {data.properties?.content && Object.keys(data.properties.content).length > 0 && (
          <div className="text-xs text-red-600 dark:text-red-400 mt-1">
            {Object.keys(data.properties.content).map(contentType => (
              <div key={contentType} className="bg-red-200 dark:bg-red-700 px-1 py-0.5 rounded mt-1 inline-block mr-1">
                {contentType}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 bg-red-500" 
      />
    </div>
  );
};

export default memo(SimpleResponseNode);
