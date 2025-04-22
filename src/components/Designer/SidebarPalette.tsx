import React from 'react';
import { useSpecStore } from '../../store/specStore';

const SidebarPalette: React.FC = () => {
  const addNode = useSpecStore(state => state.addNode);
  
  // Handler for when a component is dragged from sidebar
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    // Set the data that will be used when dropping the component onto the canvas
    event.dataTransfer.setData('application/reactflow', nodeType);
    // Set the drag image effect
    event.dataTransfer.effectAllowed = 'move';
  };
  
  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Components</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Drag components onto the canvas to build your API
        </p>
      </div>
      
      <div className="p-3 space-y-3">
        {/* Path Component */}
        <div 
          className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 p-3 rounded-md cursor-grab hover:shadow-md"
          draggable
          onDragStart={(e) => onDragStart(e, 'path')}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300">Path</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400">API endpoint path</p>
            </div>
          </div>
        </div>
        
        {/* Operation Component */}
        <div 
          className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 p-3 rounded-md cursor-grab hover:shadow-md"
          draggable
          onDragStart={(e) => onDragStart(e, 'operation')}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300">Operation</h4>
              <p className="text-xs text-green-600 dark:text-green-400">GET, POST, PUT, DELETE</p>
            </div>
          </div>
        </div>
        
        {/* Model Component */}
        <div 
          className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-800 p-3 rounded-md cursor-grab hover:shadow-md"
          draggable
          onDragStart={(e) => onDragStart(e, 'model')}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 dark:text-purple-300">Model</h4>
              <p className="text-xs text-purple-600 dark:text-purple-400">Schema definition</p>
            </div>
          </div>
        </div>
        
        {/* Parameter Component */}
        <div 
          className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 p-3 rounded-md cursor-grab hover:shadow-md"
          draggable
          onDragStart={(e) => onDragStart(e, 'parameter')}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Parameter</h4>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Path/query/header param</p>
            </div>
          </div>
        </div>
        
        {/* Response Component */}
        <div 
          className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 p-3 rounded-md cursor-grab hover:shadow-md"
          draggable
          onDragStart={(e) => onDragStart(e, 'response')}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-300">Response</h4>
              <p className="text-xs text-red-600 dark:text-red-400">HTTP response definition</p>
            </div>
          </div>
        </div>
        
        {/* Security Scheme Component */}
        <div 
          className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-md cursor-grab hover:shadow-md"
          draggable
          onDragStart={(e) => onDragStart(e, 'securityScheme')}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-300">Security</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Auth scheme definition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPalette;
