import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCrappyServerData } from '../../../../ServerProvider/old_index';

import { useSelector, useDispatch } from 'react-redux';
import { setUserDispatch } from '../../../redux/rootReducer';

import { db_uploadUserPhoto } from '../../../../ServerProvider/auth';

import {
  db_loginUser,
  db_logoutUser,
  db_getLoggedInUser,
  db_updateUserDetails,
  db_updateUserPassword,
} from '../../../../ServerProvider/auth';
import style from './UserOptions.module.css';

import UserIcon from '../../../../GlobalComponents/UserIcon/UserIcon';

function UserOptions() {
  const dispatch = useDispatch();
  const setUser = (user) => dispatch(setUserDispatch(user));
  const user = useSelector((state) => state?.user);

  const [userMenuActive, setUserMenuActive] = useState(false);

  function onIconClick() {
    setUserMenuActive(!userMenuActive);
  }

  async function changeToUser(userId) {
    getCrappyServerData(`users.${userId}`).then((res) => setUser(res));
    const user = await db_loginUser('johnJohn@gmail.com', '123456');
    const me = await db_getLoggedInUser();
  }

  async function getLoggedInUserClick() {
    const currentUserRes = await db_getLoggedInUser();
  }

  async function updateUserDetailsClick() {
    const updateUserDetailsRes = await db_updateUserDetails({
      email: 'oriroll@gmail.com',
      name: 'Mr Ori the first',
    });
  }

  async function updatePasswordClick() {
    const updateUserPasswordRes = await db_updateUserPassword(
      '123456',
      '1234567'
    );
  }

  async function logoutClick() {
    const logoutUserRes = await db_logoutUser();
    // HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.cookie = null; // TODO: Is this how to do this? Do it like this: https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
    setUser(null);
  }

  async function uploadPhotoClick(e) {
    /* e.preventDefault(); */
  }

  async function onUserPhotoUpload(e) {
    try {
      let updatedUser = await db_uploadUserPhoto(e.target.files[0]);
      updatedUser = updatedUser.data;
      setUser(updatedUser);
    } catch (error) {
      console.error('No user update on photo change', error);
    }
  }

  return (
    <div className={style['user-select']}>
      <div className={style['user-icon-wrapper']}>
        <UserIcon
          userName={user.name}
          userId={user._id}
          userPhoto={user.photo}
          onClickCallback={onIconClick}
        />
      </div>

      {userMenuActive && (
        <div
          className={style['user-options-modal']}
          onClick={() => setUserMenuActive(false)}
        >
          <div
            className={style['user-options-wrapper']}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={getLoggedInUserClick}>get LoggedIn User</button>
            <button onClick={updateUserDetailsClick}>
              update Users Details
            </button>
            <button onClick={updatePasswordClick}>updatePassword</button>
            <button onClick={logoutClick}>logout</button>
            <div className={style['upload-image-wrapper']}>
              <label htmlFor="file-input">
                <div className={style['user-image-wrapper']}>
                  <UserIcon
                    userName={user.name}
                    userId={user._id}
                    userPhoto={user.photo}
                    onClickCallback={uploadPhotoClick}
                  />
                </div>
              </label>

              <input
                id="file-input"
                type="file"
                className={style['upload-image-input']}
                onChange={(e) => onUserPhotoUpload(e)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

UserOptions.propTypes = {};

export default UserOptions;
