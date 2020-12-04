import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import {
  db_updateProject,
  db_getUserProjects,
} from '../../../../ServerProvider/projects';

import {
  setUserDispatch,
  setProjectGroupsDispatch,
  setProjectNameDispatch,
} from '../../../redux/rootReducer';

import AddNewMenuBtn from './AddNewMenuBtn/AddNewMenuBtn';
import style from './ProjectHeader.module.css';

function ProjectHeader({ project }) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const projectChange = {
    addNewGroup: (newGroup) =>
      dispatch(setProjectGroupsDispatch([...project.groups, newGroup])),
    name: (name) => dispatch(setProjectNameDispatch(name)),
  };

  async function onNameChange() {
    try {
      const updatedProject = await db_updateProject(project);
      console.log('updated project is ', updatedProject);
      projectChange.name(updatedProject.name);
      // Change project names on project names list
      let userProjects = await db_getUserProjects();
      //userProjects = userProjects.data.map(project => project.name);
      console.log('userProjects ', userProjects);
      dispatch(setUserDispatch({ ...user, projects: userProjects.data }));
      // TODO: This needs to change the array of user project names for the projects menu to change
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style['project-header']}>
      <div className={style['project-header-left']}></div>
      <input
        value={project.name}
        onChange={(e) => projectChange.name(e.target.value)}
        onBlur={onNameChange}
      />
      <div className={style['project-header-right']}>
        <AddNewMenuBtn project={project} projectChange={projectChange} />
      </div>
    </div>
  );
}

//<AddNewProjectBtn />

ProjectHeader.propTypes = {};

export default ProjectHeader;
