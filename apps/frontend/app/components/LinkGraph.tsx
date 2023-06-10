'use client';

import type { Link } from '@prisma/client';

interface LinkGraphProps {
  links: Link[];
}

const LinkGraph: React.FC<LinkGraphProps> = ({ links }) => {
  console.log(links, 'hola');
  return <div>LinkGraph</div>;
};

export default LinkGraph;
