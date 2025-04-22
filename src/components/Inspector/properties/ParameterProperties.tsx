import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Node } from 'reactflow';
import { NodeData } from '../../../store/specStore';

interface ParameterPropertiesProps {
  node: Node<NodeData>;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

// Validation schema for parameter properties
const ParameterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Name must start with a letter and contain only alphanumeric characters'),
  in: Yup.string()
    .required('Location is required')
    .oneOf(['query', 'header', 'path', 'cookie'], 'Invalid parameter location'),
  description: Yup.string(),
  required: Yup.boolean(),
  deprecated: Yup.boolean(),
  allowEmptyValue: Yup.boolean(),
  schemaType: Yup.string()
    .required('Schema type is required')
    .oneOf(['string', 'number', 'integer', 'boolean', 'array', 'object'], 'Invalid schema type'),
  format: Yup.string(),
});

const ParameterProperties: React.FC<ParameterPropertiesProps> = ({ node, updateNode }) => {
  const initialValues = {
    name: node.data.properties?.name || '',
    in: node.data.properties?.in || 'query',
    description: node.data.properties?.description || '',
    required: node.data.properties?.required || false,
    deprecated: node.data.properties?.deprecated || false,
    allowEmptyValue: node.data.properties?.allowEmptyValue || false,
    schemaType: node.data.properties?.schema?.type || 'string',
    format: node.data.properties?.schema?.format || '',
  };
  
  const handleSubmit = (values: any) => {
    const newProperties = {
      ...node.data.properties,
      name: values.name,
      in: values.in,
      description: values.description,
      required: values.required,
      deprecated: values.deprecated,
      allowEmptyValue: values.allowEmptyValue,
      schema: {
        type: values.schemaType,
        format: values.format || undefined,
      },
    };
    
    updateNode(node.id, {
      label: values.name,
      properties: newProperties,
    });
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ParameterSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Parameter Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name && touched.name
                  ? 'border-red-500 dark:border-red-700'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          
          <div>
            <label htmlFor="in" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Parameter Location
            </label>
            <Field
              as="select"
              name="in"
              id="in"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="query">query</option>
              <option value="header">header</option>
              <option value="path">path</option>
              <option value="cookie">cookie</option>
            </Field>
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
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="schemaType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data Type
              </label>
              <Field
                as="select"
                name="schemaType"
                id="schemaType"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="integer">integer</option>
                <option value="boolean">boolean</option>
                <option value="array">array</option>
                <option value="object">object</option>
              </Field>
            </div>
            
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Format (optional)
              </label>
              <Field
                type="text"
                name="format"
                id="format"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                e.g. date-time, uuid, email
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="required"
                id="required"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="required" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Required parameter
              </label>
            </div>
            
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="deprecated"
                id="deprecated"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="deprecated" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Deprecated parameter
              </label>
            </div>
            
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="allowEmptyValue"
                id="allowEmptyValue"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="allowEmptyValue" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Allow empty value
              </label>
            </div>
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

export default ParameterProperties;
