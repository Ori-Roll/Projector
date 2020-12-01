import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import AppIcon from '../../../../GlobalComponents/AppIcon/AppIcon';

import style from './Notifications.module.css';

function Notifications({ notificationsMenuActive }) {
  const user = useSelector((state) => state?.user);

  const noNotifications = () => (
    <div className={style['no-notifiaction-message']}>
      <h3>All clear</h3>
      <h3>{':-)'}</h3>
      <p>No new notifications or messages</p>
    </div>
  );

  return (
    <div
      className={style['notifications-wrapper']}
      style={{ left: notificationsMenuActive ? '65px' : '-248px' }}
    >
      {user?.pendingMessages[0]
        ? user.pendingMessages.map((msg) => (
            <div className={style['notification-message']} key={msg.header}>
              <p>HEAD:{msg.header}</p>
              <p>BODY:{msg.body}</p>
            </div>
          ))
        : noNotifications()}
    </div>
  );
}

Notifications.propTypes = {};

export default Notifications;
