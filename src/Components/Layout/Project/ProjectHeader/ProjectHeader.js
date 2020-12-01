import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { db_createNewGroup } from '../../../ServerProvider/groups';
import {
  db_updateProject,
  db_getUserProjects,
} from '../../../ServerProvider/projects';
import {
  setProjectGroupsDispatch,
  setProjectNameDispatch,
  setUserDispatch,
} from '../../../redux/rootReducer';
import AppIcon from '../../../../GlobalComponents/AppIcon/AppIcon';

import style from './ProjectHeader.module.css';
import AddNewProjectBtn from '../../../../GlobalComponents/AddNewProject/AddNewProjectBtn';

function ProjectHeader({ project }) {
  const [isWorking, setIsWorking] = useState(false);

  const [addNewActive, setAddNewActive] = useState(false);

  const dispatch = useDispatch();

  const projectChange = {
    addNewGroup: (newGroup) =>
      dispatch(setProjectGroupsDispatch([...project.groups, newGroup])),
    name: (name) => dispatch(setProjectNameDispatch(name)),
  };

  async function onAddNewGroupClick() {
    try {
      setIsWorking(true);
      const newGroup = await db_createNewGroup(project._id);
      newGroup.loaded = true;
      newGroup.getsFocus = true;
      projectChange.addNewGroup(newGroup);

      setIsWorking(false);
    } catch (error) {
      setIsWorking(false);
      console.error(error);
    }
  }

  const user = useSelector((state) => state.user);

  async function onNameChange() {
    try {
      const updatedProject = await db_updateProject(project);
      console.log('updated project is ', updatedProject);
      projectChange.name(updatedProject.name);
      // Change project names on project names list
      let userProjects = await db_getUserProjects();
      //userProjects = userProjects.data.map(project => project.name);
      console.log('userPeojects ', userProjects);
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
        <AppIcon
          icon={isWorking ? 'app-icon-time.png' : 'app-icon-plus.png'}
          color="#87b0c4"
          size={40}
          onClickCallback={() => setAddNewActive(!addNewActive)}
        />
        {addNewActive && (
          <div>
            <AppIcon
              icon={isWorking ? 'app-icon-time.png' : 'app-icon-plus.png'}
              color="#87b0c4"
              size={40}
              onClickCallback={onAddNewGroupClick}
            />
            <AddNewProjectBtn />
          </div>
        )}
      </div>
    </div>
  );
}

ProjectHeader.propTypes = {};

export default ProjectHeader;
