import React from 'react';
import PropTypes from 'prop-types';
import style from './Project.module.css';

function ProjectLoader({ message }) {
  return (
    <div className={style['project-loader']}>
      <p>{message ? message : 'Loading project...'}</p>
    </div>
  );
}

ProjectLoader.propTypes = {};

export default ProjectLoader;
