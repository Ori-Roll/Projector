import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ProjectSelect from './ProjectSelect/ProjectSelect';

import UserOptions from './UserOptions/UserOptions';
import Notifications from './Notifications/Notifications';
import style from './SideBar.module.css';

import { setUserDispatch } from '../../redux/rootReducer';
import AppIcon from '../../../GlobalComponents/AppIcon/AppIcon';
import UserCalendar from './UserCalendar/UserCalendar';

function SideBar() {
  const user = useSelector((state) => state?.user);

  const [projectSelectActive, setProjectSelectActive] = useState(false);
  const [userCalendarActive, setUserCalendarActive] = useState(false);
  const [notificationsMenuActive, setNotificationsMenuActive] = useState(false);

  return (
    <div className={style['side-bar']}>
      <ProjectSelect
        projectSelectActive={projectSelectActive}
        setProjectSelectActive={setProjectSelectActive}
      />
      <Notifications notificationsMenuActive={notificationsMenuActive} />
      <div className={style['general']}>
        <div className={style['project-select-icon-wrapper']}>
          <AppIcon
            icon="app-icon-folder-closed.png"
            onClickCallback={() => setProjectSelectActive(!projectSelectActive)}
          />
        </div>
        {/* <UserCalendar/> */}
        <div className={style['user-calendar-icon-wrapper']}>
          <AppIcon
            icon="app-icon-calendar.png"
            color={'#e6274d'}
            onClickCallback={() => setUserCalendarActive(!userCalendarActive)}
          />
        </div>
        <UserOptions />
        <div className={style['notifications-icon-wrapper']}>
          <AppIcon
            icon="app-icon-bell.png"
            onClickCallback={() =>
              setNotificationsMenuActive(!notificationsMenuActive)
            }
            color={'#5db043'}
          />
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
