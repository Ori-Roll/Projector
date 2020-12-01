import React from 'react';
import PropTypes from 'prop-types';
import style from './Loader.module.css';

function Loader({ message = 'Loading', cssOptions = {} }) {
  return (
    <div className={style['loader-wrapper']} style={{ ...cssOptions }}>
      {message}
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
