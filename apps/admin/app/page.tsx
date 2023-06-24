'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { ChevronRight, MenuIcon } from 'lucide-react';

import Sidebar from '~/app/components/sidebar/Sidebar';
import Statistic from '~/app/components/Statistic';
import { useDashboard } from './queries/dashboard';
import { ColumnsType } from 'antd/es/table';

const Home = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const { data: session } = useSession();
  const { data } = useQuery(['users'], async () => {
    const res = await fetch('/api/users');
    const data = await res.json();

    return data;
  });

  const { mutate } = useMutation(async (userId: string) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  });

  const { data: dashboardData } = useDashboard();

  const dataSource =
    data &&
    data?.map((d: any) => ({
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
    {
      key: 'action',
      dataIndex: '액션',
      title: '액션',
      width: 120,
      align: 'center',
      render: () => <div onClick={() => mutate('clil17f5k00002n12wyecc24g')}>삭제</div>,
    },
  ];

  return (
    <div className="flex h-full">
      {/* 사이드바 */}
      <Sidebar isSidebarOpened={isSidebarOpened} setSidebarOpened={setIsSidebarOpened} />
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

      {/* 메인 섹션 */}
      <div className="flex w-full flex-col px-5 pb-5 sm:px-10">
        <h2 className="my-5 text-xl">👋 {session?.user.name || '관리자'}님 안녕하세요!</h2>

        <Statistic data={dashboardData} />

        <Table dataSource={dataSource} columns={columns as any} />
      </div>
    </div>
  );
};

export default Home;
