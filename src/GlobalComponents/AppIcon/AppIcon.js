import React from 'react';
import PropTypes from 'prop-types';

import style from './AppIcon.module.css';
import { serverURI } from '../../misc/defaults/defaults';

function AppIcon({
  icon,
  onClickCallback,
  color = '#3e6ec2',
  size = 38,
  cssOptions = {},
}) {
  const photoUrl = `${serverURI}/api/v0/assets/icons/${icon}`;

  return (
    <div
      className={style['icon-wrapper']}
      onClick={onClickCallback ? onClickCallback : null}
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        ...cssOptions,
      }}
    >
      <img
        className={style['icon-img']}
        src={photoUrl}
        style={{ width: `${size / 2}px`, height: `${size / 2}px` }}
      />
    </div>
  );
}

AppIcon.propTypes = {};

export default AppIcon;
