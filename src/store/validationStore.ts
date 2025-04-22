import { create } from 'zustand';
import { OpenAPIObject } from './specStore';
import { v4 as uuidv4 } from '../utils/uuid';

export type ValidationIssue = {
  id: string;
  path: string[];
  message: string;
  severity: 'error' | 'warning' | 'info';
};

interface ValidationState {
  issues: ValidationIssue[];
  isValidating: boolean;
  
  // Actions
  validateSpec: (spec: OpenAPIObject) => void;
  clearIssues: () => void;
}

export const useValidationStore = create<ValidationState>((set) => ({
  issues: [],
  isValidating: false,
  
  validateSpec: (spec) => {
    set({ isValidating: true });
    
    // Simulate validation process
    setTimeout(() => {
      const issues: ValidationIssue[] = [];
      
      // Basic validation checks
      if (!spec.info.title || spec.info.title.trim() === '') {
        issues.push({
          id: uuidv4(),
          path: ['info', 'title'],
          message: 'API title is required',
          severity: 'error'
        });
      }
      
      if (!spec.info.version || spec.info.version.trim() === '') {
        issues.push({
          id: uuidv4(),
          path: ['info', 'version'],
          message: 'API version is required',
          severity: 'error'
        });
      }
      
      if (!spec.info.description || spec.info.description.trim() === '') {
        issues.push({
          id: uuidv4(),
          path: ['info', 'description'],
          message: 'API description is recommended',
          severity: 'warning'
        });
      }
      
      // Check paths
      if (!spec.paths || Object.keys(spec.paths).length === 0) {
        issues.push({
          id: uuidv4(),
          path: ['paths'],
          message: 'API has no paths defined',
          severity: 'warning'
        });
      } else {
        // Check operations in paths
        Object.entries(spec.paths).forEach(([path, pathItem]) => {
          if (typeof pathItem === 'object') {
            const operations = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
            const hasOperations = operations.some(op => pathItem[op]);
            
            if (!hasOperations) {
              issues.push({
                id: uuidv4(),
                path: ['paths', path],
                message: `Path ${path} has no operations defined`,
                severity: 'warning'
              });
            }
            
            // Check operations
            operations.forEach(op => {
              if (pathItem[op]) {
                const operation = pathItem[op];
                
                if (!operation.operationId) {
                  issues.push({
                    id: uuidv4(),
                    path: ['paths', path, op, 'operationId'],
                    message: `Operation ${op.toUpperCase()} ${path} is missing an operationId`,
                    severity: 'warning'
                  });
                }
                
                if (!operation.responses || Object.keys(operation.responses).length === 0) {
                  issues.push({
                    id: uuidv4(),
                    path: ['paths', path, op, 'responses'],
                    message: `Operation ${op.toUpperCase()} ${path} has no responses defined`,
                    severity: 'error'
                  });
                }
              }
            });
          }
        });
      }
      
      set({ 
        issues, 
        isValidating: false 
      });
    }, 300);
  },
  
  clearIssues: () => {
    set({ issues: [] });
  }
}));
