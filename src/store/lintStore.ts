import { create } from 'zustand';
import { OpenAPIObject } from '../types/openapi';

export type LintIssue = {
  id: string;
  path: string[];
  message: string;
  severity: 'error' | 'warning' | 'info';
  line?: number;
  column?: number;
  rule?: string;
};

interface LintState {
  issues: LintIssue[];
  isValidating: boolean;
  lastValidated: Date | null;
  
  // Actions
  validateSpec: (spec: OpenAPIObject) => void;
  setIssues: (issues: LintIssue[]) => void;
  clearIssues: () => void;
}

export const useLintStore = create<LintState>((set, get) => ({
  issues: [],
  isValidating: false,
  lastValidated: null,
  
  validateSpec: async (spec) => {
    if (!spec) return;
    
    set({ isValidating: true });
    
    try {
      // Use a Web Worker for non-blocking validation
      // This is a placeholder until we implement the actual Web Worker
      setTimeout(() => {
        // Mock validation for now
        const mockIssues: LintIssue[] = [];
        
        // Add some mock issues for testing
        if (!spec.info || !spec.info.description) {
          mockIssues.push({
            id: '1',
            path: ['info', 'description'],
            message: 'API description is missing',
            severity: 'warning',
            rule: 'info-description'
          });
        }
        
        if (!spec.paths || Object.keys(spec.paths).length === 0) {
          mockIssues.push({
            id: '2',
            path: ['paths'],
            message: 'API has no paths defined',
            severity: 'error',
            rule: 'paths-defined'
          });
        }
        
        set({ 
          issues: mockIssues,
          isValidating: false,
          lastValidated: new Date()
        });
      }, 500);
    } catch (error) {
      console.error('Validation error:', error);
      set({ 
        isValidating: false,
        lastValidated: new Date()
      });
    }
  },
  
  setIssues: (issues) => {
    set({ issues });
  },
  
  clearIssues: () => {
    set({ issues: [] });
  }
}));
