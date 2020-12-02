import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { usePopper } from 'react-popper';

import { db_createNewGroup } from '../../../../../ServerProvider/groups';
import { newProjectMenuActiveDispatch } from '../../../../redux/rootReducer';
import AppIcon from '../../../../../GlobalComponents/AppIcon/AppIcon';

import style from './AddNewMenuBtn.module.css';
import AddNewProjectBtn from '../../../../../GlobalComponents/AddNewProject/AddNewProjectBtn';
import AppDefaultMenu from '../../../../../GlobalComponents/AppDefaultMenu/AppDefaultMenu';
import AddNewProjectMenu from '../../../../../GlobalComponents/AddNewProject/AddNewProjectMenu';

function AddNewMenuBtn({ project, projectChange }) {
  const [isWorking, setIsWorking] = useState(false);

  const [addNewActive, setAddNewActive] = useState(false);

  // Popper setup
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left-end',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [0, 10],
          element: arrowElement,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          enabled: true,
          escapeWithReference: true,
          boundary: 'viewport',
          altBoundary: true,
          tether: false,
          rootBoundary: 'document',
          mainAxis: false,
        },
      },
    ],
  });

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

  const newProjectMenuActive = useSelector(
    (state) => state.app.newProjectMenuActive
  );

  console.log(newProjectMenuActive);

  return (
    <div>
      <div ref={setReferenceElement}>
        <AppIcon
          icon={isWorking ? 'app-icon-time.png' : 'app-icon-plus.png'}
          color="#87b0c4"
          size={40}
          onClickCallback={() => setAddNewActive(!addNewActive)}
        />
      </div>
      {addNewActive && (
        <div
          ref={setPopperElement}
          className={style['add-menu']}
          style={styles.popper}
          {...attributes.popper}
        >
          <AppDefaultMenu
            menuTitle={'Add new project or group'}
            menuItems={[
              {
                text: 'Add a new group',
                icon: <p>&#43;</p>,
                onClickCallback: { onAddNewGroupClick },
              },
              { text: 'Add a new project', icon: <p>&#43;</p> },
            ]}
            setMenuActive={setAddNewActive}
          />
        </div>
      )}
      {newProjectMenuActive && <AddNewProjectMenu />}
    </div>
  );
}

AddNewMenuBtn.propTypes = {};

export default AddNewMenuBtn;
