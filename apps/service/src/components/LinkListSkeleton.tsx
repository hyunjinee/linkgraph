const LinkListSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 w-full px-20">
      <div className="w-full">
        <div className="flex flex-col space-y-2 animate-pulse">
          <div className="w-full h-8 bg-gray-300 rounded-md "></div>
          <div className="w-full h-8 bg-gray-300 rounded-md "></div>
          <div className="w-full h-8 bg-gray-300 rounded-md "></div>
          <div className="w-full h-8 bg-gray-300 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default LinkListSkeleton;

// export const SkeletonCard = () => {
//   return (
//     <>
//       <div className="flex flex-col items-center flex-1 w-full px-20">
//         <div className="flex-row items-center justify-center w-1/2 p-6 mt-12 space-x-1 border animate-pulse rounded-xl ">
//           <div className="flex flex-col space-y-2">
//             <div className="w-11/12 h-6 bg-gray-300 rounded-md "></div>
//             <div className="w-10/12 h-6 bg-gray-300 rounded-md "></div>
//             <div className="w-9/12 h-6 bg-gray-300 rounded-md "></div>
//             <div className="w-9/12 h-6 bg-gray-300 rounded-md "></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
