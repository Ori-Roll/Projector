import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';
import { db_createNewColumn } from '../../../../../../ServerProvider/columns';

import { useDispatch } from 'react-redux';
import {
  addNewColumnSuccessDispatch,
  addNewColumnInitDispatch,
  addNewColumnFailedDispatch,
} from '../../../../../redux/rootReducer';

import style from './AddToGroup.module.css';
import AppIcon from '../../../../../../GlobalComponents/AppIcon/AppIcon';

function AddToGroup({ group, groupIndex }) {
  const dispatch = useDispatch();
  const addNewColumnSuccess = (newColumn, newTasks, groupIndex) =>
    dispatch(addNewColumnSuccessDispatch(newColumn, newTasks, groupIndex));
  const addNewColumnInit = () => dispatch(addNewColumnInitDispatch(groupIndex));
  const addNewColumnFailed = () =>
    dispatch(addNewColumnFailedDispatch(groupIndex));

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Popper setup
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
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

  function onMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  async function addColumnClick(type) {
    // TODO: all changes to follow this pattern
    setIsMenuOpen(!isMenuOpen);
    addNewColumnInit();
    try {
      let updatedGroup = await db_createNewColumn(group, type);
      addNewColumnSuccess(updatedGroup, groupIndex);
    } catch (error) {
      addNewColumnFailed();
      console.error(error);
    }
  }

  const menuItems = [
    //TODO: .map() for this
    <li key={'menu1'} onClick={() => addColumnClick('text')}>
      <div className={style['column-icon']}>T</div>
      <p>New Text Column</p>
    </li>,
    <li key={'menu2'} onClick={() => addColumnClick('number')}>
      <div className={style['column-icon']}>N</div>
      <p>New Number Column</p>
    </li>,
    <li key={'menu3'} onClick={() => addColumnClick('assign')}>
      <div className={style['column-icon']}>U</div>
      <p>New Users Column</p>
    </li>,
    <li key={'menu4'} onClick={() => addColumnClick('dueDate')}>
      <div className={style['column-icon']}>D</div>
      <p>New due date Column</p>
    </li>,
  ];

  return (
    <div className={style['add-to-group-wrapper']}>
      <div ref={setReferenceElement}>
        <AppIcon
          icon="app-icon-plus.png"
          onClickCallback={onMenuClick}
          color={'var(--create-new-group-theme-color-a)'}
          size={35}
        />
      </div>
      {isMenuOpen && (
        <Portal>
          <ul
            className={style['add-to-group-menu']}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {menuItems.map((item) => item)}
          </ul>
        </Portal>
      )}
    </div>
  );
}

AddToGroup.propTypes = {};

export default AddToGroup;
