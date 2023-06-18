'use client';

import { Title, Text, Card } from '@tremor/react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { ChevronRight, MenuIcon } from 'lucide-react';

import UserTable from './components/UserTable';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

const Home = () => {
  const { data } = useQuery(['users'], async () => {
    const res = await fetch('/api/users');
    const data = await res.json();

    return data;
  });

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  // const { data: session } = useSession();
  // console.log(session);
  const dataSource = data?.map((d: any) => ({
    ...d,
    key: d.id,
  }));

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

  console.log(data);

  return (
    <div className="flex h-full bg-red-50 ">
      <Sidebar isSidebarOpened={isSidebarOpened} setSidebarOpened={setIsSidebarOpened} />
      {/* <main className="p-4 mx-auto max-w-7xl md:p-10"> */}

      <div className="flex w-full flex-col">
        <Title>Users</Title>
        <Text className="mb-2">A list of users retrieved from a MySQL database (PlanetScale).</Text>

        {/* <main></main>
   
    */}
        <Table dataSource={dataSource} columns={columns} />
      </div>

      {!isSidebarOpened && (
        <div className="fixed bottom-5 left-5">
          <button
            className="enable-transition flex h-12 w-12 items-center justify-center rounded border bg-white opacity-50 hover:opacity-100"
            onClick={() => setIsSidebarOpened(true)}
          >
            <MenuIcon className="h-5 w-5" />
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
