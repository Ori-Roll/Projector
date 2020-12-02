import React, { useState } from 'react';
import PropTypes from 'prop-types';

import onClickOutside from 'react-onclickoutside';

import style from './AppDefaultMenu.module.css';

function AppDefaultMenu({ menuTitle, menuItems, setMenuActive }) {
  AppDefaultMenu.onClickOutside = () => setMenuActive(false);
  return (
    <div className={style['app-menu']}>
      <h4>{menuTitle}</h4>
      <ul className={style['app-menu-ul']}>
        {menuItems.map((item) => {
          return (
            <li className={style['app-menu-li']} onClick={item.onClickCallback}>
              {typeof item.icon === 'string' ? (
                <div>{item.icon}</div>
              ) : (
                item.icon
              )}
              <p>{item.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

AppDefaultMenu.propTypes = {};

const clickOutsideConfig = {
  handleClickOutside: () => AppDefaultMenu.onClickOutside,
};

export default onClickOutside(AppDefaultMenu, clickOutsideConfig);
