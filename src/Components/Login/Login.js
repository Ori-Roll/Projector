import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Login.module.css';

import { useDispatch } from 'react-redux';
import { setUserDispatch } from '../redux/rootReducer';

import {
  db_registerUser,
  db_loginUser,
  db_getLoggedInUser,
  db_forgotUserPassword,
  db_resetUserPassword,
  db_uploadUserPhoto,
} from '../../ServerProvider/auth';

function Login({ initApp }) {
  const dispatch = useDispatch();
  const setUser = (user) => dispatch(setUserDispatch(user));

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');

  function onEmailChange(emailVal) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (re.test(emailVal)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    setEmail(emailVal);
  }

  async function registerUserClick() {
    try {
      const registeredUserRes = await db_registerUser(
        'ori',
        'ori123456789@gmail.com',
        '123456bla'
      );
      if (registeredUserRes) {
        try {
          const user = await db_getLoggedInUser();
          setUser(user);
          initApp(user);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loginUserClick(e) {
    e.preventDefault();
    try {
      const loggedInUserRes = await db_loginUser(email, password);
      if (loggedInUserRes) {
        setUser(loggedInUserRes.user);
        initApp(loggedInUserRes.user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function forgotPasswordClick() {
    const forgotPasswordRes = await db_forgotUserPassword('oriroll@gmail.com');
    if (forgotPasswordRes)
      alert(
        'An email was sent to you. Please follow the instructions on the email to reset your password.'
      );
  }
  async function resetPasswordClick() {
    const resetUserPasswordRes = await db_resetUserPassword(
      'df5b9096c7d37cfbfd53b2a9717d47cf851ecf5d',
      '123456'
    );
  }

  return (
    <div className={style['login-page']}>
      <div className={style['color-top']} />
      <form>
        <div className={style['input-group']}>
          <label htmlFor="email-input">email:</label>
          <input
            id="email-input"
            type="email"
            name="email"
            placeholder="User email here"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <p className={style['input-warning']}>
            {isValidEmail || email === '' ? ' ' : 'Please enter a valid email'}
          </p>
        </div>
        <div className={style['input-group']}>
          <label htmlFor="password-input">password:</label>
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder="User password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={style['forgot-password-btn']}
            onClick={forgotPasswordClick}
          >
            Forgot your password ?
          </button>
        </div>
        <button
          className={
            isValidEmail && password !== ''
              ? style['login-btn']
              : style['login-btn-disabled']
          }
          onClick={(e) => loginUserClick(e)}
        >
          Login
        </button>
      </form>

      <button onClick={resetPasswordClick}>Reset password</button>
      <button onClick={(e) => registerUserClick(e)}>Register User</button>
    </div>
  );
}

Login.propTypes = {};

export default Login;
