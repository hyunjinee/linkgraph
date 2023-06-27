import React from 'react';

type LinkListProps = {
  links: Link[];
};

const LinkList = ({ links }: LinkListProps) => {
  return (
    <div>
      LinkList
      <ul>
        {links?.map((link: any) => (
          <li key={link.id}>
            <div>{link.url} : url</div>
            {/* <div>{link.title} : title</div>
            <div>{link.image} : image</div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
