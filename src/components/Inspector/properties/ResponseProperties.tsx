import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Node } from 'reactflow';
import { NodeData } from '../../../store/specStore';

interface ResponsePropertiesProps {
  node: Node<NodeData>;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

// Validation schema for response properties
const ResponseSchema = Yup.object().shape({
  statusCode: Yup.string()
    .required('Status code is required')
    .matches(/^\d{3}$|^default$/, 'Status code must be a 3-digit number or "default"'),
  description: Yup.string()
    .required('Description is required'),
});

const ResponseProperties: React.FC<ResponsePropertiesProps> = ({ node, updateNode }) => {
  const [showContentModal, setShowContentModal] = useState(false);
  const [currentContent, setCurrentContent] = useState<any>({
    mediaType: 'application/json',
    schemaType: 'object',
    schemaRef: '',
  });
  const [isEditingContent, setIsEditingContent] = useState(false);
  
  const initialValues = {
    statusCode: node.data.properties?.statusCode || '200',
    description: node.data.properties?.description || 'Successful operation',
  };
  
  const handleSubmit = (values: any) => {
    const newProperties = {
      ...node.data.properties,
      statusCode: values.statusCode,
      description: values.description,
    };
    
    updateNode(node.id, {
      label: values.statusCode,
      properties: newProperties,
    });
  };
  
  const addContent = () => {
    const content = node.data.properties?.content || {};
    
    const newContent = {
      ...content,
      [currentContent.mediaType]: {
        schema: currentContent.schemaRef
          ? { $ref: currentContent.schemaRef }
          : { type: currentContent.schemaType }
      }
    };
    
    updateNode(node.id, {
      properties: {
        ...node.data.properties,
        content: newContent,
      },
    });
    
    setShowContentModal(false);
    setCurrentContent({
      mediaType: 'application/json',
      schemaType: 'object',
      schemaRef: '',
    });
    setIsEditingContent(false);
  };
  
  const editContent = (mediaType: string) => {
    const content = node.data.properties?.content || {};
    const contentItem = content[mediaType];
    
    setCurrentContent({
      mediaType,
      schemaType: contentItem.schema.$ref ? '' : contentItem.schema.type,
      schemaRef: contentItem.schema.$ref || '',
    });
    
    setIsEditingContent(true);
    setShowContentModal(true);
  };
  
  const deleteContent = (mediaType: string) => {
    const content = { ...node.data.properties?.content };
    delete content[mediaType];
    
    updateNode(node.id, {
      properties: {
        ...node.data.properties,
        content,
      },
    });
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ResponseSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="statusCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status Code
            </label>
            <Field
              type="text"
              name="statusCode"
              id="statusCode"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.statusCode && touched.statusCode
                  ? 'border-red-500 dark:border-red-700'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            />
            <ErrorMessage name="statusCode" component="div" className="text-red-500 text-xs mt-1" />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              HTTP status code (e.g. 200, 400) or "default"
            </div>
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
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description && touched.description
                  ? 'border-red-500 dark:border-red-700'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <button
                type="button"
                onClick={() => setShowContentModal(true)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + Add Content Type
              </button>
            </div>
            
            {Object.keys(node.data.properties?.content || {}).length > 0 ? (
              <div className="border border-gray-300 dark:border-gray-600 rounded-md divide-y divide-gray-300 dark:divide-gray-600">
                {Object.entries(node.data.properties?.content || {}).map(([mediaType, content]) => (
                  <div key={mediaType} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex-1">
                      <div className="text-sm font-mono">{mediaType}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {content.schema.$ref ? (
                          <span className="bg-purple-100 dark:bg-purple-900 px-1 py-0.5 rounded text-purple-600 dark:text-purple-400">
                            {content.schema.$ref}
                          </span>
                        ) : (
                          <span className="bg-purple-100 dark:bg-purple-900 px-1 py-0.5 rounded text-purple-600 dark:text-purple-400">
                            {content.schema.type}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => editContent(mediaType)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => deleteContent(mediaType)}
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
                No content types defined yet
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
          
          {/* Content Modal */}
          {showContentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  {isEditingContent ? 'Edit Content Type' : 'Add Content Type'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Media Type
                    </label>
                    <input
                      type="text"
                      value={currentContent.mediaType}
                      onChange={(e) => setCurrentContent({ ...currentContent, mediaType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      disabled={isEditingContent}
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      e.g. application/json, text/plain
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Schema
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setCurrentContent({ ...currentContent, schemaRef: '' })}
                        className={`px-3 py-1 text-sm rounded-md ${
                          !currentContent.schemaRef
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Type
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentContent({ ...currentContent, schemaRef: '#/components/schemas/' })}
                        className={`px-3 py-1 text-sm rounded-md ${
                          currentContent.schemaRef
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Reference
                      </button>
                    </div>
                    
                    {currentContent.schemaRef ? (
                      <input
                        type="text"
                        value={currentContent.schemaRef}
                        onChange={(e) => setCurrentContent({ ...currentContent, schemaRef: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="#/components/schemas/ModelName"
                      />
                    ) : (
                      <select
                        value={currentContent.schemaType}
                        onChange={(e) => setCurrentContent({ ...currentContent, schemaType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="object">object</option>
                        <option value="array">array</option>
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="integer">integer</option>
                        <option value="boolean">boolean</option>
                      </select>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowContentModal(false);
                        setIsEditingContent(false);
                        setCurrentContent({
                          mediaType: 'application/json',
                          schemaType: 'object',
                          schemaRef: '',
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="button"
                      onClick={addContent}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      disabled={!currentContent.mediaType.trim()}
                    >
                      {isEditingContent ? 'Update' : 'Add'}
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

export default ResponseProperties;
