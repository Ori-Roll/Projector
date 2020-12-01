import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './GroupArrow.module.css';
import AppIcon from '../../../../../../GlobalComponents/AppIcon/AppIcon';

function GroupArrow({ groupIsOpen, setGroupIsOpen }) {
  const [arrowDown, setArrowDown] = useState(groupIsOpen);

  const diraction = {
    rotated: 'rotate(90deg) translate(-1%, 15%)',
    straight: 'translateX(-12%)',
  };

  useEffect(() => setArrowDown(groupIsOpen), [groupIsOpen]);

  const onArrowClick = () => {
    setGroupIsOpen(!groupIsOpen);
  };

  return (
    <div
      className={style['group-arrow-wrapper']}
      style={
        arrowDown
          ? { transform: diraction.rotated }
          : { transform: diraction.straight }
      }
    >
      {/* <div
        className={style['group-arrow']}
        onClick={onArrowClick}
        style={
          arrowDown
            ? { transform: diraction.rotated }
            : { transform: diraction.straight }
        }
      >
        &#x27A4;
      </div> */}
      <AppIcon
        icon="app-icon-arrow-triangle-right.png"
        cssOptions={{ background: 'none' }}
        size={40}
        onClickCallback={onArrowClick}
      />
    </div>
  );
}

GroupArrow.propTypes = {};

export default GroupArrow;
