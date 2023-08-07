import type { NextRouter } from 'next/router';
import type { ParsedUrlQueryInput } from 'querystring';
import Link from 'next/link';
import { Divider } from 'antd';
import { ChevronRight, Home, Package2 } from 'lucide-react';

import styles from './menu.module.css';

export type Menu = {
  id: string;
  name: string;
  link?: {
    path: string;
    query?: ParsedUrlQueryInput;
  };
  icon?: React.ReactNode;
  isActive?: (router: NextRouter, link: Menu['link']) => boolean;
  submenu?: Menu[];
};

const mainMenuData: Menu[] = [
  {
    id: 'home',
    name: '홈',
    icon: <Home className="w-5 h-5" />,
    link: {
      path: '/',
    },
  },
  {
    id: 'product',
    name: '유저 관리',
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: 'productList',
        name: '상품 목록',
        link: {
          path: '/sample/product/list',
        },
      },
    ],
  },
];

const MainMenu = () => {
  return (
    <>
      <Divider orientation="left" plain>
        메인
      </Divider>

      <ul className={styles.menu}>
        {mainMenuData.map((menu) => {
          return (
            <>
              <li key={menu.id}>
                <Link
                  href={{
                    pathname: menu.link?.path ?? '/',
                    query: menu.link?.query,
                  }}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                  <ChevronRight className="" />
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default MainMenu;
