import { Title, Text, Card } from '@tremor/react';
import type { NextPage } from 'next';
import UserTable from './components/UserTable';

const Home: NextPage = () => {
  return (
    <main className="p-4 mx-auto md:p-10 max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a MySQL database (PlanetScale).</Text>

      <Card className="mt-6">
        <UserTable />
      </Card>
    </main>
  );
};

export default Home;
