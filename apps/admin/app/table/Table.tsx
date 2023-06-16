'use client';

import React, { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Table } from 'antd';

const DefaultTable = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);

  return <Table>여기에</Table>;
};

export default React.memo(DefaultTable);
