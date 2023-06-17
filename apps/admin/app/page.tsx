'use client';

import { Title, Text, Card } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';

import UserTable from './components/UserTable';

const Home = () => {
  const { data } = useQuery(['users'], async () => {
    const res = await fetch('http://localhost:3000/api/users');
    const data = await res.json();

    return data;
  });

  console.log(data);
  // const res = await fetch('http://localhost:3000/api/users');
  // const data = await res.json();

  // console.log(data);

  // const { data: session } = useSession();
  // console.log(session);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '권한',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Users</Title>
      <Text className="mb-2">A list of users retrieved from a MySQL database (PlanetScale).</Text>
      {/* {JSON.stringify(data)} */}
      {/* <Card className="mt-6">
        <UserTable />
      </Card> */}
      <Table dataSource={data} columns={columns} />
    </main>
  );
};

export default Home;
