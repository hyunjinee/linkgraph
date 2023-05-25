import { Table, TableHead, TableHeaderCell, TableRow } from '@tremor/react';

const UserTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableRow>
      </TableHead>
    </Table>
  );
};

export default UserTable;
