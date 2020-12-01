import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SelectedMenu.module.css';
import {
  clearSelectedTasksDispatch,
  setProjectGroupDispatch,
} from './../../../../../redux/rootReducer';

import { db_deleteTasks } from '../../../../../ServerProvider/tasks';

import { useSelector, useDispatch } from 'react-redux';
import { usePopper } from 'react-popper';
import AppIcon from '../../../../../../GlobalComponents/AppIcon/AppIcon';

function SelectedMenu() {
  const [menuIsActive, setMenuIsActive] = useState(false);

  const dispatch = useDispatch();
  const selected = useSelector((state) => state.project.selectedTasks);
  const project = useSelector((state) => state.project);

  const clearSelectedTasks = () => dispatch(clearSelectedTasksDispatch());
  const setProjectGroup = (group) => dispatch(setProjectGroupDispatch(group));

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [5, 5],
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

  function onCheckAll() {
    console.log('CHECK ALL');
  }

  async function onDeleteSelected() {
    try {
      const deleteResGroup = await db_deleteTasks(selected, project._id);
      deleteResGroup.loaded = true;
      setProjectGroup(deleteResGroup);
      clearSelectedTasks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style['task-selected-menu-wrapper']}>
      <button
        type="button"
        ref={setReferenceElement}
        onClick={() => setMenuIsActive(!menuIsActive)}
        className={style['task-selected-menu-btn']}
      >
        &#x2630;
      </button>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {menuIsActive && (
          <div
            className={style['task-selected-menu']}
            style={{ visibility: menuIsActive ? 'visible' : 'hidden' }}
          >
            <div className={style['selected-action-btn']}>
              <AppIcon
                id="select-all"
                icon="app-icon-check-round.png"
                onClickCallback={onCheckAll}
                color="#4078a8"
                size={28}
              />
              <label htmlFor="select-all">Select all tasks</label>
            </div>
            <div className={style['selected-action-btn']}>
              <AppIcon
                id="delete-selected"
                icon="app-icon-trash-can.png"
                onClickCallback={onDeleteSelected}
                color="#4078a8"
                size={28}
              />
              <label htmlFor="select-all">Delete selected tasks</label>
            </div>
          </div>
        )}
        {/* <div
          ref={setArrowElement}
          className={style['selected-action-menu-arrow']}
          style={styles.arrow}
        >
          {'<'}
        </div> */}
      </div>
      {/*  <div className={style["icon-wrapper"]}>
                <AppIcon 
                    icon="app-icon-select-checkbox-checked.png" 
                    onClickCallback={()=>setMenuIsActive(!menuIsActive)}
                    color={(selected.length > 0) ?  "#3f84bf" : "#8aa4ba"} 
                    size={28}
                />
            </div>
             */}
    </div>
  );
}

SelectedMenu.propTypes = {};

export default SelectedMenu;
