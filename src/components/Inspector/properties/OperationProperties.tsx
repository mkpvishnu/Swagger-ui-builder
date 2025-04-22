import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Node } from 'reactflow';
import { NodeData } from '../../../store/specStore';

interface OperationPropertiesProps {
  node: Node<NodeData>;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

// Validation schema for operation properties
const OperationSchema = Yup.object().shape({
  method: Yup.string()
    .required('Method is required')
    .oneOf(['get', 'post', 'put', 'delete', 'patch', 'options', 'head'], 'Invalid HTTP method'),
  operationId: Yup.string()
    .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Operation ID must start with a letter and contain only alphanumeric characters')
    .required('Operation ID is required'),
  summary: Yup.string(),
  description: Yup.string(),
  tags: Yup.string(),
  deprecated: Yup.boolean(),
});

const OperationProperties: React.FC<OperationPropertiesProps> = ({ node, updateNode }) => {
  const initialValues = {
    method: node.data.properties?.method || 'get',
    operationId: node.data.properties?.operationId || '',
    summary: node.data.properties?.summary || '',
    description: node.data.properties?.description || '',
    tags: (node.data.properties?.tags || []).join(', '),
    deprecated: node.data.properties?.deprecated || false,
  };
  
  const handleSubmit = (values: any) => {
    // Process tags (convert comma-separated string to array)
    const tags = values.tags
      ? values.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : [];
    
    const newProperties = {
      ...node.data.properties,
      method: values.method,
      operationId: values.operationId,
      summary: values.summary,
      description: values.description,
      tags,
      deprecated: values.deprecated,
    };
    
    updateNode(node.id, {
      label: values.method.toUpperCase(),
      properties: newProperties,
    });
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OperationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              HTTP Method
            </label>
            <Field
              as="select"
              name="method"
              id="method"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="put">PUT</option>
              <option value="delete">DELETE</option>
              <option value="patch">PATCH</option>
              <option value="options">OPTIONS</option>
              <option value="head">HEAD</option>
            </Field>
            <ErrorMessage name="method" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          
          <div>
            <label htmlFor="operationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operation ID
            </label>
            <Field
              type="text"
              name="operationId"
              id="operationId"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.operationId && touched.operationId
                  ? 'border-red-500 dark:border-red-700'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            />
            <ErrorMessage name="operationId" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Summary
            </label>
            <Field
              type="text"
              name="summary"
              id="summary"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              id="description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <Field
              type="text"
              name="tags"
              id="tags"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Example: user, auth, admin
            </div>
          </div>
          
          <div className="flex items-center">
            <Field
              type="checkbox"
              name="deprecated"
              id="deprecated"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="deprecated" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Mark as deprecated
            </label>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Apply Changes'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OperationProperties;
