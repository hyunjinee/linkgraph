import Image from 'next/image';
import Link from 'next/link';

const TempArea = () => {
  return (
    <>
      {/* Logo */}
      <div className="relative w-200px h-200px">
        <Image src="/linkgraph.svg" alt="hi" priority width={200} height={200} />
      </div>

      {/* 임시 영역 */}
      <h1 className="font-bold text-purple-400 ">서비스 준비중입니다.</h1>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Link href="/graph">그래프 컨셉 구경하기</Link>
        </button>
      </div>
    </>
  );
};

export default TempArea;
