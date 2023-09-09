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
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkmode';

const SidebarContainer = styled.div`
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;
`;

const Top = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #6439ff;
  }
`;

const Title = styled.p`
  font-size: 10px;
  font-weight: bold;
  color: #999;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ece8ff;
  }

  .icon {
    font-size: 18px;
    color: #7451f8;
  }

  span {
    font-size: 13px;
    font-weight: 600;
    color: #888;
    margin-left: 10px;
  }
`;

export default function Sidebar() {
  const { dispatch } = useContext(DarkModeContext);

  if (!dispatch) {
    return null;
  }

  return (
    <SidebarContainer>
      <Top>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">hyunjin</span>
        </Link>
      </Top>

      <hr
        css={css`
          height: 0;
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
          <Title className="title">MAIN</Title>
          <List>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </List>
          <Title className="title">LISTS</Title>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <List>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </List>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <List>
              <StoreIcon className="icon" />
              <span>Products</span>
            </List>
          </Link>
          <List>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </List>
          <List>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </List>
          <p className="title">USEFUL</p>
          <List>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </List>
          <List>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </List>
          <p className="title">SERVICE</p>
          <List>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </List>
          <List>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </List>
          <List>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </List>
          <p className="title">USER</p>
          <List>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </List>
          <List>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </List>
        </ul>
      </div>

      <div
        css={css`
          display: flex;
          align-items: center;
          margin: 10px;

          .colorOption {
            width: 20px;
            height: 20px;
            border-radius: 5px;
            border: 1px solid #7451f8;
            cursor: pointer;
            margin: 5px;

            &:nth-child(1) {
              background-color: whitesmoke;
            }
            &:nth-child(2) {
              background-color: #333;
            }
          }
        `}
      >
        <div className="colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: 'DARK' })}></div>
      </div>
    </SidebarContainer>
  );
}
