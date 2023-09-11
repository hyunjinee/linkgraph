'use client';

import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table } from 'antd';

import Statistic from '~/components/Statistic';
import { useDashboard } from './queries/dashboard';
import { ColumnsType } from 'antd/es/table';
import Accordian from '~/components/Accordian/AccordianNotCompound';

const Home = () => {
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

  // TODO: fix this
  const dataSource: readonly any[] | undefined = [];
  // data &&
  // data?.map((d: any) => ({
  //   ...d,
  //   key: d.id,
  // }));

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
    <div className="flex w-full h-full">
      <div className="flex flex-col w-full px-5 pb-5 sm:px-10">
        <h2 className="my-5 text-xl">👋 {session?.user.name || '관리자'}님 안녕하세요!</h2>

        <Statistic data={dashboardData} />
        <Table dataSource={dataSource} columns={columns as any} />

        <Accordian
          title="아코디안"
          contents={
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat tenetur reiciendis excepturi deserunt
              dolores, at quae? Odit veniam libero, incidunt in illo eius praesentium quia rerum eaque illum
              perspiciatis sint.
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Home;
