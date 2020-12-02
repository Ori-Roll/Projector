import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { newProjectMenuActiveDispatch } from '../../Components/redux/rootReducer';
import ProjectTypeDetails from './ProjectTypeDetails/ProjectTypeDetails';
import ProjectTypeItems from './ProjectTypeItems/ProjectTypeItems';

import style from './AddNewProject.module.css';

function AddNewProjectMenu(props) {
  const dispatch = useDispatch();
  const setAddNewProjectMenuActive = (isActive) =>
    dispatch(newProjectMenuActiveDispatch(isActive));

  const [selectedProjectType, setSelectedProjectType] = useState(null);

  return (
    <div
      className={style['add-new-project-menu']}
      onClick={(e) => e.stopPropagation()}
    >
      {selectedProjectType ? (
        <ProjectTypeDetails
          selectedProjectType={selectedProjectType}
          setSelectedProjectType={setSelectedProjectType}
          setAddNewProjectMenuActive={setAddNewProjectMenuActive}
        />
      ) : (
        <ProjectTypeItems
          selectedProjectType={selectedProjectType}
          setSelectedProjectType={setSelectedProjectType}
        />
      )}
    </div>
  );
}

AddNewProjectMenu.propTypes = {};

export default AddNewProjectMenu;
