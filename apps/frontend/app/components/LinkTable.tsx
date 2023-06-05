import React from 'react';
import { Link } from '@prisma/client';

// prisma model type import 해야함
interface LinkTableProps {
  links: Link[];
}

const LinkTable: React.FC<LinkTableProps> = ({ links }) => {
  return (
    <div>
      <h2>LinkTable</h2>

      {links.map((link) => {
        return (
          <>
            <div>{JSON.stringify(link)}</div>
          </>
        );
      })}
    </div>
  );
};

export default LinkTable;
