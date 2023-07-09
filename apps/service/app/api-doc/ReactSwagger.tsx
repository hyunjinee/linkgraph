'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface ReactSwaggerProps {
  spec: Record<string, any>;
}

const ReactSwagger: React.FC<ReactSwaggerProps> = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export default ReactSwagger;
