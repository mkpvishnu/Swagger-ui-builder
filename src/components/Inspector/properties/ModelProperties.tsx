import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Node } from 'reactflow';
import { NodeData } from '../../../store/specStore';

interface ModelPropertiesProps {
  node: Node<NodeData>;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

// Validation schema for model properties
const ModelSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Name must start with a letter and contain only alphanumeric characters'),
  type: Yup.string()
    .required('Type is required')
    .oneOf(['object', 'array', 'string', 'number', 'integer', 'boolean'], 'Invalid type'),
  description: Yup.string(),
});

const ModelProperties: React.FC<ModelPropertiesProps> = ({ node, updateNode }) => {
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<any>({
    name: '',
    type: 'string',
    description: '',
    required: false,
  });
  const [isEditingProperty, setIsEditingProperty] = useState(false);
  
  const initialValues = {
    name: node.data.properties?.name || 'NewModel',
    type: node.data.properties?.type || 'object',
    description: node.data.properties?.description || '',
    required: node.data.properties?.required || [],
  };
  
  const handleSubmit = (values: any) => {
    const newProperties = {
      ...node.data.properties,
      name: values.name,
      type: values.type,
      description: values.description,
      required: values.required,
    };
    
    updateNode(node.id, {
      label: values.name,
      properties: newProperties,
    });
  };
  
  const addProperty = (property: any, setFieldValue: any) => {
    const properties = node.data.properties?.properties || {};
    const newProperties = {
      ...properties,
      [property.name]: {
        type: property.type,
        description: property.description,
      }
    };
    
    const newRequired = property.required 
      ? [...(node.data.properties?.required || []), property.name]
      : node.data.properties?.required || [];
    
    updateNode(node.id, {
      properties: {
        ...node.data.properties,
        properties: newProperties,
        required: newRequired,
      },
    });
    
    setFieldValue('required', newRequired);
    setShowPropertyModal(false);
    setCurrentProperty({
      name: '',
      type: 'string',
      description: '',
      required: false,
    });
    setIsEditingProperty(false);
  };
  
  const editProperty = (propertyName: string) => {
    const properties = node.data.properties?.properties || {};
    const property = properties[propertyName];
    
    setCurrentProperty({
      name: propertyName,
      type: property.type,
      description: property.description || '',
      required: (node.data.properties?.required || []).includes(propertyName),
    });
    
    setIsEditingProperty(true);
    setShowPropertyModal(true);
  };
  
  const deleteProperty = (propertyName: string, setFieldValue: any) => {
    const properties = { ...node.data.properties?.properties };
    delete properties[propertyName];
    
    const newRequired = (node.data.properties?.required || []).filter(
      name => name !== propertyName
    );
    
    updateNode(node.id, {
      properties: {
        ...node.data.properties,
        properties,
        required: newRequired,
      },
    });
    
    setFieldValue('required', newRequired);
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ModelSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Model Name
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
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <Field
              as="select"
              name="type"
              id="type"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="object">object</option>
              <option value="array">array</option>
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="integer">integer</option>
              <option value="boolean">boolean</option>
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
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Properties
              </label>
              <button
                type="button"
                onClick={() => setShowPropertyModal(true)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + Add Property
              </button>
            </div>
            
            {Object.keys(node.data.properties?.properties || {}).length > 0 ? (
              <div className="border border-gray-300 dark:border-gray-600 rounded-md divide-y divide-gray-300 dark:divide-gray-600">
                {Object.entries(node.data.properties?.properties || {}).map(([name, property]) => (
                  <div key={name} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-mono text-sm">{name}</span>
                        {(node.data.properties?.required || []).includes(name) && (
                          <span className="ml-2 px-1 py-0.5 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded text-xs">
                            required
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="bg-purple-100 dark:bg-purple-900 px-1 py-0.5 rounded text-purple-600 dark:text-purple-400">
                          {typeof property === 'object' ? property.type : typeof property}
                        </span>
                        
                        {property.description && (
                          <span className="ml-2">{property.description}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => editProperty(name)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => deleteProperty(name, setFieldValue)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                No properties defined yet
              </div>
            )}
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
          
          {/* Property Modal */}
          {showPropertyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  {isEditingProperty ? 'Edit Property' : 'Add Property'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Property Name
                    </label>
                    <input
                      type="text"
                      value={currentProperty.name}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      disabled={isEditingProperty}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <select
                      value={currentProperty.type}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="integer">integer</option>
                      <option value="boolean">boolean</option>
                      <option value="array">array</option>
                      <option value="object">object</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={currentProperty.description}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requiredCheckbox"
                      checked={currentProperty.required}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, required: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requiredCheckbox" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Required
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPropertyModal(false);
                        setIsEditingProperty(false);
                        setCurrentProperty({
                          name: '',
                          type: 'string',
                          description: '',
                          required: false,
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => addProperty(currentProperty, setFieldValue)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      disabled={!currentProperty.name.trim()}
                    >
                      {isEditingProperty ? 'Update' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ModelProperties;
