import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import GroupArrow from './GroupArrow/GroupArrow';
import style from './GroupHeader.module.css';
import AddToGroup from './AddToGroup/AddToGroup';

import GroupTitle from './GroupTitle/GroupTitle';

function GroupHeader({ groupIsOpen, setGroupIsOpen, group, groupIndex }) {
  const onHeaderClick = () => {
    setGroupIsOpen(!groupIsOpen);
  };

  return (
    <div className={style['group-header-wrapper']}>
      <div
        className={style['group-header']}
        style={{ fontWeight: groupIsOpen ? '600' : '400' }}
        onClick={onHeaderClick}
      >
        <GroupArrow groupIsOpen={groupIsOpen} setGroupIsOpen={setGroupIsOpen} />
        <GroupTitle group={group} />
      </div>
      <div className={style['group-header-right-menu']}>
        <AddToGroup group={group} groupIndex={groupIndex} />
      </div>
    </div>
  );
}

GroupHeader.propTypes = {};

export default GroupHeader;
