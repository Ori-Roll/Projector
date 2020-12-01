import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { createNewProject } from '../../../Components/ServerProvider/projects';
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
      <div className={style['type-options-wrapper']}>
        <span>
          This is a text for the main paragraph. This will be filled with some
          text describing the actions the user needs to go through to create
          this new project. This will include how the project is going to look
          like and what options are available for the user to choose from.
        </span>
        <br />
        <br />
        <h3>You can choose from the next options</h3>
        <br />
        <input
          type="checkbox"
          name="filled"
          value="Help me fill this form with basic info"
        />
        Help me by filling this form with basic info
        <br />
        <br />
        <input
          type="checkbox"
          name="daily-repeat"
          value="This task will repeat daily."
        />
        This task will repeat daily.
        <br />
        <br />
        <h4>Schooldays</h4>
        <input type="checkbox" name="monday" value="monday." />
        monday
        <input type="checkbox" name="tuesday" value="tuesday." />
        tuesday
        <input type="checkbox" name="wednesday" value="wednesday." />
        wednesday
        <input type="checkbox" name="thursday" value="thursday." />
        thursday
        <input type="checkbox" name="friday" value="friday." />
        friday
        <input type="checkbox" name="sunday" value="sunday." />
        sunday
        <br />
      </div>

      <div className={style['done-btn']} onClick={onDoneClick}>
        Done
      </div>
    </div>
  );
}

ProjectTypeDetails.propTypes = {};

export default ProjectTypeDetails;
