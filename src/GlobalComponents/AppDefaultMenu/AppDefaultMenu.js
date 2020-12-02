import React from 'react';
import PropTypes from 'prop-types';

import style from './AppDefaultMenu.module.css';

function AppDefaultMenu({ menuItems }) {
  return (
    <div className={style['app-menu']}>
      <h4>This is heading</h4>
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
