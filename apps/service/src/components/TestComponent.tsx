import React from 'react';

const TestComponent = ({ children }: { children: React.ReactNode }) => {
  console.log(children, 'children');
  return <div>{children}</div>;
};

export default TestComponent;
