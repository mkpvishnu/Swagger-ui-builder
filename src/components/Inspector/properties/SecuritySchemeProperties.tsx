import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Node } from 'reactflow';
import { NodeData } from '../../../store/specStore';

interface SecuritySchemePropertiesProps {
  node: Node<NodeData>;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

// Validation schema for security scheme properties
const SecuritySchemeSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  type: Yup.string()
    .required('Type is required')
    .oneOf(['apiKey', 'http', 'oauth2', 'openIdConnect'], 'Invalid security scheme type'),
  description: Yup.string(),
  // Conditional fields based on type
  in: Yup.string()
    .when('type', {
      is: 'apiKey',
      then: Yup.string().required('Location is required').oneOf(['query', 'header', 'cookie'], 'Invalid location'),
      otherwise: Yup.string(),
    }),
  paramName: Yup.string()
    .when('type', {
      is: 'apiKey',
      then: Yup.string().required('Parameter name is required'),
      otherwise: Yup.string(),
    }),
  scheme: Yup.string()
    .when('type', {
      is: 'http',
      then: Yup.string().required('HTTP auth scheme is required'),
      otherwise: Yup.string(),
    }),
  bearerFormat: Yup.string()
    .when('scheme', {
      is: 'bearer',
      then: Yup.string(),
      otherwise: Yup.string(),
    }),
  openIdConnectUrl: Yup.string()
    .when('type', {
      is: 'openIdConnect',
      then: Yup.string().required('OpenID Connect URL is required').url('Must be a valid URL'),
      otherwise: Yup.string(),
    }),
});

const SecuritySchemeProperties: React.FC<SecuritySchemePropertiesProps> = ({ node, updateNode }) => {
  const initialValues = {
    name: node.data.label || 'Auth',
    type: node.data.properties?.type || 'http',
    description: node.data.properties?.description || '',
    in: node.data.properties?.in || 'header',
    paramName: node.data.properties?.name || '',
    scheme: node.data.properties?.scheme || 'bearer',
    bearerFormat: node.data.properties?.bearerFormat || 'JWT',
    openIdConnectUrl: node.data.properties?.openIdConnectUrl || '',
  };
  
  const handleSubmit = (values: any) => {
    // Build properties object based on the security scheme type
    let newProperties: any = {
      type: values.type,
      description: values.description,
    };
    
    // Add type-specific properties
    switch (values.type) {
      case 'apiKey':
        newProperties = {
          ...newProperties,
          in: values.in,
          name: values.paramName,
        };
        break;
      case 'http':
        newProperties = {
          ...newProperties,
          scheme: values.scheme,
        };
        
        if (values.scheme === 'bearer' && values.bearerFormat) {
          newProperties.bearerFormat = values.bearerFormat;
        }
        break;
      case 'openIdConnect':
        newProperties = {
          ...newProperties,
          openIdConnectUrl: values.openIdConnectUrl,
        };
        break;
      case 'oauth2':
        // OAuth2 flows would need more complex UI, simplified for MVP
        newProperties = {
          ...newProperties,
          flows: {
            implicit: {
              authorizationUrl: 'https://example.com/auth',
              scopes: {
                'read:api': 'Read access',
                'write:api': 'Write access',
              },
            },
          },
        };
        break;
    }
    
    updateNode(node.id, {
      label: values.name,
      properties: newProperties,
    });
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SecuritySchemeSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Security Scheme Name
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
              <option value="http">HTTP Authentication</option>
              <option value="apiKey">API Key</option>
              <option value="oauth2">OAuth 2.0</option>
              <option value="openIdConnect">OpenID Connect</option>
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
          
          {/* Conditional fields based on security scheme type */}
          {values.type === 'apiKey' && (
            <>
              <div>
                <label htmlFor="in" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key Location
                </label>
                <Field
                  as="select"
                  name="in"
                  id="in"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="query">Query Parameter</option>
                  <option value="header">Header</option>
                  <option value="cookie">Cookie</option>
                </Field>
                <ErrorMessage name="in" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div>
                <label htmlFor="paramName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Parameter Name
                </label>
                <Field
                  type="text"
                  name="paramName"
                  id="paramName"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.paramName && touched.paramName
                      ? 'border-red-500 dark:border-red-700'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  placeholder="X-API-Key"
                />
                <ErrorMessage name="paramName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </>
          )}
          
          {values.type === 'http' && (
            <>
              <div>
                <label htmlFor="scheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  HTTP Authentication Scheme
                </label>
                <Field
                  as="select"
                  name="scheme"
                  id="scheme"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="bearer">Bearer</option>
                  <option value="basic">Basic</option>
                  <option value="digest">Digest</option>
                </Field>
                <ErrorMessage name="scheme" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              
              {values.scheme === 'bearer' && (
                <div>
                  <label htmlFor="bearerFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bearer Format
                  </label>
                  <Field
                    type="text"
                    name="bearerFormat"
                    id="bearerFormat"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="JWT"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format of the bearer token (e.g. JWT)
                  </div>
                </div>
              )}
            </>
          )}
          
          {values.type === 'openIdConnect' && (
            <div>
              <label htmlFor="openIdConnectUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                OpenID Connect URL
              </label>
              <Field
                type="text"
                name="openIdConnectUrl"
                id="openIdConnectUrl"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.openIdConnectUrl && touched.openIdConnectUrl
                    ? 'border-red-500 dark:border-red-700'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                placeholder="https://example.com/.well-known/openid-configuration"
              />
              <ErrorMessage name="openIdConnectUrl" component="div" className="text-red-500 text-xs mt-1" />
            </div>
          )}
          
          {values.type === 'oauth2' && (
            <div className="text-sm text-gray-500 dark:text-gray-400 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
              OAuth 2.0 flow configuration is simplified in this MVP.
              <br />
              Default implicit flow will be configured with read/write scopes.
            </div>
          )}
          
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

export default SecuritySchemeProperties;
