import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Node } from 'reactflow';
import { NodeData } from '../../../store/specStore';

interface PathPropertiesProps {
  node: Node<NodeData>;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

// Validation schema for path properties
const PathSchema = Yup.object().shape({
  path: Yup.string()
    .required('Path is required')
    .matches(/^\//, 'Path must start with /')
    .test(
      'no-trailing-slash',
      'Path should not end with / (except for root path)',
      value => value === '/' || !value.endsWith('/')
    ),
  summary: Yup.string(),
  description: Yup.string(),
});

const PathProperties: React.FC<PathPropertiesProps> = ({ node, updateNode }) => {
  const initialValues = {
    path: node.data.properties?.path || '/path',
    summary: node.data.properties?.summary || '',
    description: node.data.properties?.description || '',
  };
  
  const handleSubmit = (values: any) => {
    const newProperties = { ...node.data.properties, ...values };
    updateNode(node.id, {
      label: values.path,
      properties: newProperties,
    });
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PathSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="path" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Path
            </label>
            <Field
              type="text"
              name="path"
              id="path"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.path && touched.path
                  ? 'border-red-500 dark:border-red-700'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            />
            <ErrorMessage name="path" component="div" className="text-red-500 text-xs mt-1" />
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

export default PathProperties;
