import React, { useState, useEffect } from 'react';
import { useSpecStore } from '../../store/specStore';

const SimpleInspector: React.FC = () => {
  const { selectedNode, updateNode, removeNode } = useSpecStore();
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  // When selected node changes, update form data
  useEffect(() => {
    if (selectedNode?.data?.properties) {
      setFormData(selectedNode.data.properties);
    }
  }, [selectedNode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNode) {
      // Update the label based on node type
      let label = selectedNode.data.label;
      if (selectedNode.data.type === 'path' && formData.path) {
        label = formData.path;
      } else if (selectedNode.data.type === 'operation' && formData.method) {
        label = formData.method.toUpperCase();
      } else if (selectedNode.data.type === 'model' && formData.name) {
        label = formData.name;
      } else if (selectedNode.data.type === 'parameter' && formData.name) {
        label = formData.name;
      } else if (selectedNode.data.type === 'response' && formData.statusCode) {
        label = formData.statusCode;
      }
      
      updateNode(selectedNode.id, {
        label,
        properties: formData
      });
    }
  };
  
  const handleDelete = () => {
    if (selectedNode) {
      removeNode(selectedNode.id);
    }
  };
  
  const getNodeColor = (type: string): string => {
    switch (type) {
      case 'path':
        return 'bg-blue-500';
      case 'operation':
        return 'bg-green-500';
      case 'model':
        return 'bg-purple-500';
      case 'parameter':
        return 'bg-yellow-500';
      case 'response':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  if (!selectedNode) {
    return (
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="p-4 text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2 text-center">Select a node to view and edit its properties</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Properties</h3>
        <button 
          onClick={handleDelete}
          className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          title="Delete Node"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex space-x-2 items-center mb-4">
          <div className={`w-3 h-3 rounded-full ${getNodeColor(selectedNode.data.type)}`}></div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selectedNode.data.type.charAt(0).toUpperCase() + selectedNode.data.type.slice(1)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {selectedNode.id}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Path node properties */}
          {selectedNode.data.type === 'path' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Path
                </label>
                <input
                  type="text"
                  name="path"
                  value={formData.path || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Summary
                </label>
                <input
                  type="text"
                  name="summary"
                  value={formData.summary || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </>
          )}
          
          {/* Operation node properties */}
          {selectedNode.data.type === 'operation' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  HTTP Method
                </label>
                <select
                  name="method"
                  value={formData.method || 'get'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="get">GET</option>
                  <option value="post">POST</option>
                  <option value="put">PUT</option>
                  <option value="delete">DELETE</option>
                  <option value="patch">PATCH</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Operation ID
                </label>
                <input
                  type="text"
                  name="operationId"
                  value={formData.operationId || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Summary
                </label>
                <input
                  type="text"
                  name="summary"
                  value={formData.summary || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </>
          )}
          
          {/* Model node properties */}
          {selectedNode.data.type === 'model' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Model Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type || 'object'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="object">object</option>
                  <option value="array">array</option>
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="integer">integer</option>
                  <option value="boolean">boolean</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Properties (JSON)
                </label>
                <textarea
                  name="propertiesJson"
                  value={JSON.stringify(formData.properties || {}, null, 2)}
                  rows={5}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs"
                />
                <p className="text-xs text-gray-500 mt-1">Properties editing not available in this simplified version</p>
              </div>
            </>
          )}
          
          {/* Parameter node properties */}
          {selectedNode.data.type === 'parameter' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parameter Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <select
                  name="in"
                  value={formData.in || 'query'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="query">query</option>
                  <option value="path">path</option>
                  <option value="header">header</option>
                  <option value="cookie">cookie</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requiredCheckbox"
                  name="required"
                  checked={formData.required || false}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="requiredCheckbox" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Required
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </>
          )}
          
          {/* Response node properties */}
          {selectedNode.data.type === 'response' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status Code
                </label>
                <input
                  type="text"
                  name="statusCode"
                  value={formData.statusCode || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content Types
                </label>
                <textarea
                  name="contentTypes"
                  value={JSON.stringify(formData.content || {}, null, 2)}
                  rows={3}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs"
                />
                <p className="text-xs text-gray-500 mt-1">Content editing not available in this simplified version</p>
              </div>
            </>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleInspector;
