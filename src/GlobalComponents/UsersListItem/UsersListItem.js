import React from 'react';
import PropTypes from 'prop-types';
import UserIcon from '../UserIcon/UserIcon';

import style from './UsersListItem.module.css';

function UsersListItem({ user, onClickCallback }) {
  return (
    <li
      key={user._id}
      className={style['user-li']}
      onClick={(e) => onClickCallback(e, user)}
    >
      <div className={style['user-icon-wrapper']}>
        <UserIcon
          key={user._id}
          userName={user.name}
          userPhoto={user.photo}
          userId={user._id}
        />
      </div>
      <div>
        <h3>{user.name}</h3>
        <h2>{user.email}</h2>
      </div>
    </li>
  );
}

UsersListItem.propTypes = {};

export default UsersListItem;
