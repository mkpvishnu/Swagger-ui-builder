import React, { useState } from 'react';
import { useSpecStore } from '../../store/specStore';
import { exportToJson, exportToYaml } from '../../utils/exportUtils';

const SimplePreview: React.FC = () => {
  const { spec } = useSpecStore();
  const [displayFormat, setDisplayFormat] = useState<'json' | 'yaml'>('json');
  
  const getSpecString = () => {
    return displayFormat === 'json' 
      ? exportToJson(spec) 
      : exportToYaml(spec);
  };
  
  return (
    <div className="h-full w-full overflow-auto p-4 bg-white dark:bg-gray-800">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">API Preview</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setDisplayFormat('json')}
            className={`px-3 py-1 text-sm rounded ${
              displayFormat === 'json'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => setDisplayFormat('yaml')}
            className={`px-3 py-1 text-sm rounded ${
              displayFormat === 'yaml'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            YAML
          </button>
        </div>
      </div>
      
      <div className="border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 p-4 overflow-auto h-full">
        <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
          {getSpecString()}
        </pre>
      </div>
    </div>
  );
};

export default SimplePreview;
