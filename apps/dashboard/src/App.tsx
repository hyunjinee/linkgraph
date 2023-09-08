import { useState } from 'react';
import Home from './pages/home/Home';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Login from './pages/login/Login';

const Layout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/products',
        element: <Products />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
