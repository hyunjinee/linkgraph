import { topDealUsers } from '../../data';
import './TopBox.scss';
import React from 'react';

export default function TopBox() {
  return (
    <div className="topBox">
      <h1>Top Deals</h1>

      <div className="list">
        {topDealUsers.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amout">{user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
