import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { createNewProject } from '../../../ServerProvider/projects';
import { setProjectDispatch } from '../../../Components/redux/rootReducer';
import useResetTemporaryOperations from '../../globalControllers/useResetTemporaryOperations';

import style from './ProjectTypeDetails.module.css';
import { serverURI } from '../../../misc/defaults/defaults';

function ProjectTypeDetails({
  selectedProjectType,
  setSelectedProjectType,
  setAddNewProjectMenuActive,
}) {
  const dispatch = useDispatch();
  const setProjectToSelected = (project) =>
    dispatch(setProjectDispatch(project));

  const resetTemporaryOperations = useResetTemporaryOperations('all');

  const loadingProjectMessage = (
    <div className={style['loading-project-message']}>
      <h3>Just a moment...</h3>
      <p>"Setting up your new project."</p>
      <img
        src={`${serverURI}/api/v0/projectTypes/${selectedProjectType.icon}`}
      />
    </div>
  );

  async function onDoneClick() {
    setAddNewProjectMenuActive(false);
    resetTemporaryOperations({ projectLoadingMessage: loadingProjectMessage });
    const newProjectRes = await createNewProject(
      selectedProjectType.projectProperties
    );
    setProjectToSelected(newProjectRes);
  }

  return (
    <div className={style['type-details']}>
      <div
        className={style['back-btn']}
        onClick={() => setSelectedProjectType(null)}
      >
        {'< Back'}
      </div>
      <div className={style['type-title-header']}>
        {selectedProjectType.title}
      </div>
      <div className={style['done-btn']} onClick={onDoneClick}>
        Done
      </div>
    </div>
  );
}

ProjectTypeDetails.propTypes = {};

export default ProjectTypeDetails;
