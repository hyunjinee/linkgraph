import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col">
        <div>페이지를 찾을 수 없어요.</div>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Link href="/">홈으로 가기</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
