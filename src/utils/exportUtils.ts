import { OpenAPIObject } from '../store/specStore';

/**
 * Exports the OpenAPI spec to JSON format
 */
export const exportToJson = (spec: OpenAPIObject): string => {
  return JSON.stringify(spec, null, 2);
};

/**
 * Exports the OpenAPI spec to YAML format
 * This is a simple implementation - in a production app, you would use a library like js-yaml
 */
export const exportToYaml = (spec: OpenAPIObject): string => {
  // For simplicity, we're just converting JSON to a YAML-like format
  const jsonString = JSON.stringify(spec, null, 2);
  
  // Replace quotes and colons
  return jsonString
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, '');
};

/**
 * Saves content as a file for download
 */
export const saveAsFile = (content: string, fileName: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Exports the OpenAPI spec to a JSON file
 */
export const downloadAsJson = (spec: OpenAPIObject, fileName: string = 'openapi-spec.json') => {
  const json = exportToJson(spec);
  saveAsFile(json, fileName, 'application/json');
};

/**
 * Exports the OpenAPI spec to a YAML file
 */
export const downloadAsYaml = (spec: OpenAPIObject, fileName: string = 'openapi-spec.yaml') => {
  const yaml = exportToYaml(spec);
  saveAsFile(yaml, fileName, 'text/yaml');
};
