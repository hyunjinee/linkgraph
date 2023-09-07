import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import './Sidebar.scss';

const SidebarContainer = styled.div`
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">hyunjin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div
        css={css`
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span
            css={css`
              font-size: 20px;
            `}
          >
            hyunijn
          </span>
        </Link>
      </div>

      <hr
        css={css`
          height: 0px;
          border: 0.5px solid rgb(230, 227, 227);
        `}
      />

      <div
        css={css`
          padding-left: 10px;
        `}
      >
        <ul
          css={css`
            list-style: none;
            margin: 0;
            padding: 0;
          `}
        >
          <p
            css={css`
              font-size: 10px;
              font-weight: bold;
              color: #999;
              margin-top: 15px;
              margin-bottom: 5px;
            `}
          >
            MAIN
          </p>
          <li
            css={css`
              display: flex;
              align-items: center;
              padding: 5px;
              cursor: pointer;

              &:hover {
                font-size: 18px;
                color: #7451f8;
              }
            `}
          >
            <DashboardIcon
              css={css`
                font-size: 18px;
                color: #7451f8;
              `}
            />
            <span
              css={css`
                font-size: 13px;
                font-weight: 600;
                color: #888;
                margin-left: 10px;
              `}
            >
              Dashboard
            </span>
          </li>
        </ul>
      </div>
      <div className="bottom"></div> */}
    </SidebarContainer>
  );
}
