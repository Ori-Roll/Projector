import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { createNewProject } from '../../../ServerProvider/projects';
import { setProjectDispatch } from '../../../Components/redux/rootReducer';
import useResetTemporaryOperations from '../../globalControllers/useResetTemporaryOperations';

import style from './ProjectTypeDetails.module.css';

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
      <p>Just a moment...</p>
      <p>"Setting up your new project."</p>
      <img
        src={`http://localhost:5000/api/v0/projectTypes/${selectedProjectType.icon}`}
      />
    </div>
  );

  async function onDoneClick() {
    setAddNewProjectMenuActive(false);
    resetTemporaryOperations({ projectLoadingMessage: loadingProjectMessage });
    const newProjectRes = await createNewProject(
      selectedProjectType.projectProperties
    );
    console.log('newProjectRes', newProjectRes);
    debugger;
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
