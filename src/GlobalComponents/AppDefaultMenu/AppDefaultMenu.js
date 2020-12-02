import React from 'react';
import PropTypes from 'prop-types';

import style from './AppDefaultMenu.module.css';

function AppDefaultMenu({ menuTitle, menuItems }) {
  return (
    <div className={style['app-menu']}>
      <h4>{menuTitle}</h4>
      <ul className={style['app-menu-ul']}>
        {menuItems.map((item) => {
          return (
            <li className={style['app-menu-li']} onClick={item.onClickCallback}>
              <div>{item.icon}</div>
              <p>{item.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

AppDefaultMenu.propTypes = {};

export default AppDefaultMenu;
