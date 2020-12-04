import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setProjectDispatch } from '../../../redux/rootReducer';
import { getProject } from '../../../../ServerProvider/projects';

import AppIcon from '../../../../GlobalComponents/AppIcon/AppIcon';
import useResetTemporaryOperations from '../../../../GlobalComponents/globalControllers/useResetTemporaryOperations';

import style from './ProjectSelect.module.css';
import AddNewProjectBtn from '../../../../GlobalComponents/AddNewProject/AddNewProjectBtn';

function ProjectSelect({ projectSelectActive, setProjectSelectActive }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user);
  const project = useSelector((state) => state.project);
  const setProject = (project) => dispatch(setProjectDispatch(project));

  const resetSelectedTasks = useResetTemporaryOperations('selectedTasks');
  const resetTemporaryOperations = useResetTemporaryOperations('all');

  async function setSelectedProject(projectId) {
    // This prevents reloading the same project;
    if (project._id === projectId) {
      resetSelectedTasks();
      return setProjectSelectActive(false);
    }

    try {
      setProjectSelectActive(false);
      resetTemporaryOperations();
      const newProjectRes = await getProject(projectId, true);
      setProject(newProjectRes.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <>
      <div
        style={{ display: projectSelectActive ? 'initial' : 'none' }}
        className={style['add-new-project-menu-modal']}
        onClick={(e) => {
          e.stopPropagation();
          setProjectSelectActive(false);
        }}
      />
      <div
        className={style['project-select']}
        style={{ left: projectSelectActive ? '50px' : '-232px' }}
        onBlur={() => setProjectSelectActive(false)}
      >
        <div className={style['project-select-header-menu']}>
          <AppIcon
            icon="app-icon-back-arrow.png"
            onClickCallback={() => setProjectSelectActive(false)}
          />
          <AddNewProjectBtn />
        </div>

        <div className={style['project-select-list']}>
          {user.projects
            ? user.projects?.map((project) => {
                return (
                  <button
                    className={style['project-select-btn']}
                    key={`${project._id}BTN`}
                    onClick={(e) => setSelectedProject(project._id)}
                  >
                    {project.name === ' ' ? 'nameless project' : project.name}
                  </button>
                );
              })
            : ' ! no projects ! '}
        </div>
      </div>
    </>
    /* TODO: change so it will load a proj if no viewed proj */
  );
}

ProjectSelect.propTypes = {};

export default ProjectSelect;
