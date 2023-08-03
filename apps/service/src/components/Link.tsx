import Image from 'next/image';

type LinkProps = { link: Link };

const Link = ({ link }: LinkProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-3 overflow-hidden transition rounded-md cursor-pointer group bg-neutral-400/5 gap-x-4 hover:bg-neutral-400/10">
      <div className="relative w-full h-full overflow-hidden rounded-md aspect-square">
        {/* TODO Default Image */}
        {link.image && <Image className="object-cover" src={link.image} alt="image" fill />}
        {!link.image && <div className="w-full h-full bg-pink-50" />}
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="w-full font-semibold truncate">{link.title}</p>
        <p className="w-full text-sm truncate text-neutral-400">By {link.url}</p>
      </div>
    </div>
  );
};

export default Link;
