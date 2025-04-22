import React, { useEffect } from 'react';
import { useValidationStore } from '../../store/validationStore';
import { useSpecStore } from '../../store/specStore';

const ValidationPanel: React.FC = () => {
  const { issues, isValidating, validateSpec } = useValidationStore();
  const { spec } = useSpecStore();
  
  // Validate spec when it changes
  useEffect(() => {
    validateSpec(spec);
  }, [spec, validateSpec]);
  
  return (
    <div className="h-64 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-auto">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Validation Results</h3>
        <div className="flex items-center space-x-2">
          {isValidating && (
            <span className="text-gray-500 dark:text-gray-400 text-sm">Validating...</span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {issues.length} {issues.length === 1 ? 'issue' : 'issues'} found
          </span>
        </div>
      </div>
      
      {issues.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {issues.map((issue) => (
            <div 
              key={issue.id} 
              className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex items-start">
                {issue.severity === 'error' ? (
                  <div className="flex-shrink-0 text-red-500 dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex-shrink-0 text-yellow-500 dark:text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className="ml-3 flex-1">
                  <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {issue.message}
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-mono">
                      {issue.path.length > 0 ? issue.path.join('.') : 'root'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2">No issues found. Your API spec looks good!</p>
        </div>
      )}
    </div>
  );
};

export default ValidationPanel;
