// import { useState, Fragment } from 'react';
// import { Transition, Dialog } from '@headlessui/react';

// interface LoginModalProps {
//   // isOpen: boolean;
// }

// const LoginModal: React.FC<LoginModalProps> = () => {
//   return (
//     <Transition
//       show={isOpen}
//       enter="transition duration-100 ease-out"
//       enterFrom="transform scale-95 opacity-0"
//       enterTo="transform scale-100 opacity-100"
//       leave="transition duration-75 ease-out"
//       leaveFrom="transform scale-100 opacity-100"
//       leaveTo="transform scale-95 opacity-0"
//       as={Fragment}
//     >
//       <Dialog as="div" className="relative z-10" onClose={() => {}}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>
//         <Dialog.Panel>
//           <Dialog.Title>Deactivate account</Dialog.Title>
//           {/* ... */}
//         </Dialog.Panel>
//       </Dialog>
//     </Transition>
//   );
// };

// export default LoginModal;
