import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useSpecStore } from '../../store/specStore';
import { exportToYaml } from '../../utils/exportUtils';

const SwaggerPreview: React.FC = () => {
  const spec = useSpecStore(state => state.spec);
  const [specString, setSpecString] = useState<string>('');
  
  useEffect(() => {
    // Convert the spec to YAML for SwaggerUI
    const yamlSpec = exportToYaml(spec);
    setSpecString(yamlSpec);
  }, [spec]);
  
  return (
    <div className="h-full w-full overflow-auto">
      <div className="swagger-wrapper p-4">
        {/* Apply some custom styles to adapt Swagger UI to our app theme */}
        <style jsx="true">{`
          .swagger-ui .info .title {
            color: #0ea5e9;
          }
          .dark .swagger-ui .info .title,
          .dark .swagger-ui .info .base-url,
          .dark .swagger-ui .info,
          .dark .swagger-ui h1, 
          .dark .swagger-ui h2, 
          .dark .swagger-ui h3, 
          .dark .swagger-ui h4, 
          .dark .swagger-ui h5, 
          .dark .swagger-ui h6 {
            color: #e5e7eb;
          }
          .dark .swagger-ui .opblock-tag,
          .dark .swagger-ui .opblock .opblock-section-header h4,
          .dark .swagger-ui .opblock .opblock-section-header > label,
          .dark .swagger-ui .tab li {
            color: #e5e7eb;
          }
          .dark .swagger-ui .opblock .opblock-section-header {
            background: #374151;
          }
          .dark .swagger-ui section.models {
            border: 1px solid #4b5563;
            background: #1f2937;
          }
          .dark .swagger-ui section.models.is-open h4 {
            color: #e5e7eb;
            border-bottom: 1px solid #4b5563;
            background: #374151;
          }
          .dark .swagger-ui .model-title,
          .dark .swagger-ui .models-control {
            color: #e5e7eb;
          }
          .dark .swagger-ui .model {
            color: #e5e7eb;
          }
          .dark .swagger-ui .renderedMarkdown p {
            color: #d1d5db;
          }
          .dark .swagger-ui table thead tr th,
          .dark .swagger-ui .parameter__name, 
          .dark .swagger-ui .parameter__type {
            color: #e5e7eb;
          }
          .dark .swagger-ui .response-col_status {
            color: #e5e7eb;
          }
          .dark .swagger-ui .scheme-container {
            background: #1f2937;
            box-shadow: none;
          }
          .dark .swagger-ui select {
            background: #374151;
            color: #e5e7eb;
            border-color: #4b5563;
          }
          .dark .swagger-ui .btn {
            color: #e5e7eb;
            background: #374151;
            border-color: #4b5563;
          }
          .swagger-ui .info hgroup.main {
            margin: 0;
          }
          .swagger-ui .scheme-container {
            padding: 10px 0;
            margin: 0;
          }
        `}</style>
        
        {/* Render the Swagger UI with our spec */}
        <SwaggerUI 
          spec={spec}
          docExpansion="list"
          defaultModelsExpandDepth={1}
          displayOperationId={true}
        />
      </div>
    </div>
  );
};

export default SwaggerPreview;
