import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import {
  editColumnInitDispatch,
  editColumnSuccessDispatch,
  editColumnFailedDispatch,
} from '../../../../../redux/rootReducer';

import { db_editColumn } from '../../../../../ServerProvider/columns';

import ColumnHeadPopup from './ColumnHeadPopup';

import style from './ColumnHead.module.css';

function ColumnHead({ column, columnIndex, groupIndex }) {
  const [columnTitle, setColumnTitle] = useState(column.title);

  const [hovered, setHovered] = useState(false);

  const dispatch = useDispatch();
  const editColumn = {
    init: (groupIndex, columnIndex, column) =>
      dispatch(editColumnInitDispatch(groupIndex, columnIndex, column)),
    success: (groupIndex, columnIndex, column) =>
      dispatch(editColumnSuccessDispatch(groupIndex, columnIndex, column)),
    failed: (groupIndex, columnIndex, column) =>
      dispatch(editColumnFailedDispatch(groupIndex, columnIndex, column)),
  };
  /* 
	const editColumnInit = (groupIndex, columnIndex, column) =>
		dispatch(editColumnInitDispatch(groupIndex, columnIndex, column)); */

  async function onHeadChange(title) {
    const changedColumn = { ...column, title: title };
    /* setColumnTitle(titleChange); */
    //TODO: This works but renders a lot of cells and headers, many change locally and debounce the rest
    editColumn.init(groupIndex, columnIndex, changedColumn);
  }

  function onMouseDown() {
    console.log('MOUSE DOWN CLICK');
    /* 	changeGroupData({
			editedColumn: {
				//editedColumn need to be renamed changedColumn or maby just column
				id: column.id,
				isDragged: true,
			},
			type: "EDIT_COLUMN",
		}); */
  }

  async function onBlur(title) {
    const changedColumn = { ...column, title: title };
    editColumn.init(groupIndex, columnIndex, changedColumn);
    try {
      const columnRes = await db_editColumn(changedColumn);
      editColumn.success(groupIndex, columnIndex, changedColumn);
    } catch (error) {
      console.error(error);
      editColumn.failed(groupIndex, columnIndex, column);
      // TODO: make editColumnErr revert changes
      // 		 (maby use column (comes with this functions colsure) to revert)
    }
  }

  return (
    <div
      className={
        style[
          column.type && column.type === 'title'
            ? 'column-head-title-wrapper'
            : 'column-head-wrapper'
        ]
      }
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setTimeout(() => setHovered(false), 200)}
      style={
        column.type && column.type !== 'title'
          ? { backgroundColor: column.color }
          : {}
      }
    >
      {column.type && column.type !== 'title' && (
        <div className={style['column-drag-handle']}>&#8942;&#8942;</div>
      )}
      {column.type !== 'title' && (
        <div // TODO: DO I NEED THIS ?
          className={style['column-content-wrapper']}
        >
          <input
            className={style['column-head-item']}
            value={column.title}
            onChange={(e) => onHeadChange(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
          />
        </div>
      )}

      <ColumnHeadPopup
        hovered={hovered}
        column={column}
        onMouseDown={onMouseDown}
      />
    </div>
  );
}
/* :{ backgroundColor: column.color ? column.color} */
ColumnHead.propTypes = {};

export default ColumnHead;
