// import type { Link } from '@prisma/client';

interface LinkTableProps {
  links: any;
}

const LinkTable: React.FC<LinkTableProps> = ({ links }) => {
  return (
    <div>
      <h2>LinkTable</h2>

      {links.map((link: any) => {
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
