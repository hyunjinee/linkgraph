'use client';

import { Title, Text, Card } from '@tremor/react';
import type { NextPage } from 'next';
import UserTable from './components/UserTable';
import { useSession } from 'next-auth/react';

const Home = () => {
  // const res = await fetch('http://localhost:3000/api/users');
  // const data = await res.json();

  // console.log(data);

  const { data: session } = useSession();
  console.log(session);

  return (
    <main className="p-4 mx-auto md:p-10 max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a MySQL database (PlanetScale).</Text>

      {/* {JSON.stringify(data)} */}
      <Card className="mt-6">
        <UserTable />
      </Card>
    </main>
  );
};

export default Home;
