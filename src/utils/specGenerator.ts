import { OpenAPIObject } from '../types/openapi';

/**
 * Generates a default OpenAPI specification template
 */
export const generateDefaultSpec = (): OpenAPIObject => {
  return {
    openapi: '3.0.3',
    info: {
      title: 'New API',
      description: 'API description',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'https://api.example.com/v1',
        description: 'Production server'
      },
      {
        url: 'https://staging-api.example.com/v1',
        description: 'Staging server'
      }
    ],
    paths: {
      '/ping': {
        get: {
          summary: 'Server health check',
          description: 'Returns a simple response to check if the server is up',
          operationId: 'getPing',
          responses: {
            '200': {
              description: 'Successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: {
                        type: 'string',
                        example: 'ok'
                      },
                      timestamp: {
                        type: 'string',
                        format: 'date-time'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {},
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      {
        name: 'health',
        description: 'Health check operations'
      }
    ]
  };
};

/**
 * Converts a flow-based node representation back to an OpenAPI spec
 */
export const nodesAndEdgesToSpec = (nodes: any[], edges: any[]): OpenAPIObject => {
  // This is a placeholder for the actual implementation
  // In the future, this will transform the visual nodes into an OpenAPI spec
  
  return generateDefaultSpec();
};
