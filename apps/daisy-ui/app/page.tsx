import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-24 bg-red-50">
      <div className="w-24 rounded-full avatar">
        <div className="w-24 ">
          <Image src="/profile.png" fill alt="profile" />
        </div>
      </div>
    </main>
  );
}
