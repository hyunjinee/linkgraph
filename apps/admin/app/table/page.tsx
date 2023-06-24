import DefaultTable from './Table';
import prisma from '@linkgraph/db';

const TableTestPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <>
      <DefaultTable />
    </>
  );
};

export default TableTestPage;
