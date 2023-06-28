import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
  <main className="w-full h-full px-4 mx-auto bg-pink-500 max-w-7xl sm:px-6 lg:px-8">{children}</main>
);

export default Layout;
