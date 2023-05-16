import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState([20, 30, 45, 70, 26]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-red-100">
      <span>hdi</span>
    </main>
  );
}
