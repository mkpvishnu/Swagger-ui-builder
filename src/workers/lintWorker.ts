// This is a Web Worker for non-blocking OpenAPI validation

import { LintIssue } from '../store/lintStore';
import { v4 as uuidv4 } from '../utils/uuid';

// Mock validation rules for basic linting
const validateSpec = (spec: any): LintIssue[] => {
  const issues: LintIssue[] = [];

  // Basic validation rules based on the OpenAPI spec
  if (!spec) {
    issues.push({
      id: uuidv4(),
      path: [],
      message: 'Spec is empty or invalid',
      severity: 'error'
    });
    return issues;
  }

  // Check for required properties
  if (!spec.openapi) {
    issues.push({
      id: uuidv4(),
      path: ['openapi'],
      message: 'OpenAPI version is required',
      severity: 'error',
      rule: 'openapi-required'
    });
  } else if (!spec.openapi.startsWith('3.')) {
    issues.push({
      id: uuidv4(),
      path: ['openapi'],
      message: 'Only OpenAPI 3.x is supported',
      severity: 'error',
      rule: 'openapi-version'
    });
  }

  // Validate info object
  if (!spec.info) {
    issues.push({
      id: uuidv4(),
      path: ['info'],
      message: 'Info object is required',
      severity: 'error',
      rule: 'info-required'
    });
  } else {
    if (!spec.info.title) {
      issues.push({
        id: uuidv4(),
        path: ['info', 'title'],
        message: 'API title is required',
        severity: 'error',
        rule: 'info-title-required'
      });
    }
    
    if (!spec.info.version) {
      issues.push({
        id: uuidv4(),
        path: ['info', 'version'],
        message: 'API version is required',
        severity: 'error',
        rule: 'info-version-required'
      });
    }
    
    if (!spec.info.description) {
      issues.push({
        id: uuidv4(),
        path: ['info', 'description'],
        message: 'API description is recommended',
        severity: 'warning',
        rule: 'info-description-recommended'
      });
    }
  }

  // Validate paths
  if (!spec.paths) {
    issues.push({
      id: uuidv4(),
      path: ['paths'],
      message: 'Paths object is required',
      severity: 'error',
      rule: 'paths-required'
    });
  } else if (Object.keys(spec.paths).length === 0) {
    issues.push({
      id: uuidv4(),
      path: ['paths'],
      message: 'API has no paths defined',
      severity: 'warning',
      rule: 'paths-empty'
    });
  }

  return issues;
};

// Set up the worker message handler
self.onmessage = (event) => {
  const { spec } = event.data;
  
  try {
    const issues = validateSpec(spec);
    self.postMessage({ issues });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};

export {};
