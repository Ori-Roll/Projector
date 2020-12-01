import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import ProjectHeader from './ProjectHeader/ProjectHeader';
import Group from './Group/Group';
import ProjectLoader from './ProjectLoader';

import {
  setProjectGroupsDispatch,
  changeLoadedStateDispatch,
} from '../../redux/rootReducer';

import { getProjectGroups } from '../../../ServerProvider/groups';

import style from './Project.module.css'; // TODO: change from style to: import classes from '..';

function Project() {
  const dispatch = useDispatch();

  const project = useSelector((state) => state?.project);
  const setProjectGroups = (project) =>
    dispatch(setProjectGroupsDispatch(project));
  const projectLoadingState = useSelector((state) => state?.app.loaded.project);
  const changeProjectLoadedState = (loadingState) =>
    dispatch(changeLoadedStateDispatch('project', loadingState));

  async function initGroups() {
    try {
      let groups = await getProjectGroups(project._id);
      groups = groups.data;
      groups.forEach((group) => {
        group.loaded = true;
      });
      setProjectGroups(groups);
      changeProjectLoadedState(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initGroups();
  }, [project._id]);

  return (
    <>
      {projectLoadingState ? (
        <ProjectLoader message={projectLoadingState} />
      ) : (
        <div className={style.project}>
          <ProjectHeader project={project} />
          {project.groups?.map((group, i) => {
            return <Group key={group._id} group={group} groupIndex={i} />;
          })}
        </div>
      )}
    </>
  );
}

Project.propTypes = {};

export default Project;
