export type OpenAPIObject = {
  openapi: string;
  info: InfoObject;
  servers?: ServerObject[];
  paths?: PathsObject;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
  [key: string]: any;
};

export type InfoObject = {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: string;
  [key: string]: any;
};

export type ContactObject = {
  name?: string;
  url?: string;
  email?: string;
  [key: string]: any;
};

export type LicenseObject = {
  name: string;
  url?: string;
  [key: string]: any;
};

export type ServerObject = {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
  [key: string]: any;
};

export type ServerVariableObject = {
  enum?: string[];
  default: string;
  description?: string;
  [key: string]: any;
};

export type PathsObject = {
  [path: string]: PathItemObject;
};

export type PathItemObject = {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: ServerObject[];
  parameters?: (ParameterObject | ReferenceObject)[];
  [key: string]: any;
};

export type OperationObject = {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  responses: ResponsesObject;
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
  [key: string]: any;
};

export type ExternalDocumentationObject = {
  description?: string;
  url: string;
  [key: string]: any;
};

export type ParameterObject = {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  content?: ContentObject;
  [key: string]: any;
};

export type RequestBodyObject = {
  description?: string;
  content: ContentObject;
  required?: boolean;
  [key: string]: any;
};

export type ContentObject = {
  [mediaType: string]: MediaTypeObject;
};

export type MediaTypeObject = {
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  encoding?: Record<string, EncodingObject>;
  [key: string]: any;
};

export type EncodingObject = {
  contentType?: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  [key: string]: any;
};

export type ResponsesObject = {
  default?: ResponseObject | ReferenceObject;
  [statusCode: string]: ResponseObject | ReferenceObject;
};

export type ResponseObject = {
  description: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  content?: ContentObject;
  links?: Record<string, LinkObject | ReferenceObject>;
  [key: string]: any;
};

export type CallbackObject = {
  [expression: string]: PathItemObject;
};

export type HeaderObject = Omit<ParameterObject, 'name' | 'in'>;

export type LinkObject = {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: ServerObject;
  [key: string]: any;
};

export type TagObject = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  [key: string]: any;
};

export type SchemaObject = {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any[];
  type?: string | string[];
  allOf?: (SchemaObject | ReferenceObject)[];
  oneOf?: (SchemaObject | ReferenceObject)[];
  anyOf?: (SchemaObject | ReferenceObject)[];
  not?: SchemaObject | ReferenceObject;
  items?: SchemaObject | ReferenceObject;
  properties?: Record<string, SchemaObject | ReferenceObject>;
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  format?: string;
  default?: any;
  nullable?: boolean;
  discriminator?: DiscriminatorObject;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XMLObject;
  externalDocs?: ExternalDocumentationObject;
  example?: any;
  deprecated?: boolean;
  [key: string]: any;
};

export type DiscriminatorObject = {
  propertyName: string;
  mapping?: Record<string, string>;
  [key: string]: any;
};

export type XMLObject = {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
  [key: string]: any;
};

export type SecuritySchemeObject = {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string;
  in?: 'query' | 'header' | 'cookie';
  scheme?: string;
  bearerFormat?: string;
  flows?: OAuthFlowsObject;
  openIdConnectUrl?: string;
  [key: string]: any;
};

export type OAuthFlowsObject = {
  implicit?: OAuthFlowObject;
  password?: OAuthFlowObject;
  clientCredentials?: OAuthFlowObject;
  authorizationCode?: OAuthFlowObject;
  [key: string]: any;
};

export type OAuthFlowObject = {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
  [key: string]: any;
};

export type SecurityRequirementObject = {
  [name: string]: string[];
};

export type ReferenceObject = {
  $ref: string;
};

export type ExampleObject = {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
  [key: string]: any;
};

export type ComponentsObject = {
  schemas?: Record<string, SchemaObject | ReferenceObject>;
  responses?: Record<string, ResponseObject | ReferenceObject>;
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
  [key: string]: any;
};
