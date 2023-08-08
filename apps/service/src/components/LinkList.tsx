import Link from '~/components/Link';

type LinkListProps = {
  userId: string;
};

const LinkList = async ({ userId }: LinkListProps) => {
  const res = await fetch(
    process.env.NODE_ENV === 'production'
      ? 'https://link-graph.vercel.app/api/link?userId=' + userId
      : 'http://localhost:3000/api/link?userId=' + userId,
  );

  const links = (await res.json()) as Link[];

  return (
    <>
      {!links?.length && <div className="mb-4 text-neutral-400">연결된 링크가 없습니다.</div>}
      <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
        {links?.map((link) => (
          <Link link={link} key={link.id} />
        ))}
      </div>
    </>
  );
};

export default LinkList;
