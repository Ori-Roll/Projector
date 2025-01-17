import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import _ from 'lodash';
import { useInView } from 'react-intersection-observer';

import { db_changeTask } from '../../../../../ServerProvider/tasks';
import { editTaskDispatch } from '../../../../redux/rootReducer';

import { CellOfType } from './Cells/CellTypes/CellTypes';
import CellWrapper from './CellWrapper';

import style from './Task.module.css';
import SelectCheckbox from './SelectCheckbox/SelectCheckbox';

function Task({ task, columns, taskIndex, groupIndex, addNewTask }) {
  const [taskWrapperRef, inView, entry] = useInView();

  const [taskIsSelected, setTaskIsSelected] = useState(false);

  const dispatch = useDispatch();
  const editTask = (groupIndex, taskIndex, task) =>
    dispatch(editTaskDispatch(groupIndex, taskIndex, task));

  function createCell(
    column = () => console.error('no column for cell'),
    options = []
  ) {
    if (!column.type) throw new Error('No column.type for cell');
    const cell = task.cells.find((cell) => cell.columnMatch === column._id);
    if (!cell) {
      console.error(`task with no cell match for column.id ${column.id}`);
    } else {
      return CellOfType[column.type](
        cell,
        doCellChange,
        task,
        taskChange,
        ...options
      );
    }
  }

  async function cellChange(newTask) {
    try {
      // Change on server
      let changedTask = await db_changeTask(newTask);
      changedTask = changedTask.data;
      /*	// TODO: This should check for the individual cell
				console.error("Task on server does not match task change");
			} */

      // Change on store - only change the cell (not deepCloned)

      /* editTask(groupIndex, taskIndex, task); */
    } catch (error) {
      console.error(error);
    }
  }

  function doLocalChange(cell) {
    const newCells = _.cloneDeep(task.cells);
    const cellIndex = newCells.findIndex(
      (cellItem) => cellItem.columnMatch === cell.columnMatch
    );
    if (cellIndex > -1) {
      newCells[cellIndex] = cell;
    }
    const newTask = { ...task, cells: newCells };
    editTask(groupIndex, taskIndex, newTask);
    /* setTask(newTask); */
    return newTask;
  }

  function doCellChange(cell, debounced) {
    const delayedCellChange = _.debounce((newTask) => {
      cellChange(newTask);
    }, 800);

    if (debounced) {
      const newTask = doLocalChange(cell);
      // cellChange(newTask);
      /* delayedCellChange.cancel();
			delayedCellChange(newTask); */
    } else {
      delayedCellChange.cancel();
      const newTask = doLocalChange(cell);
      cellChange(newTask);
    }
  }

  async function taskChange(changedTask) {
    editTask(groupIndex, taskIndex, changedTask);
    try {
      let resChangedTask = await db_changeTask(changedTask);
      resChangedTask = resChangedTask.data;
      if (resChangedTask.isMock !== task.isMock) return;
      editTask(groupIndex, taskIndex, resChangedTask);
    } catch (error) {
      // This changes task back to the task in the functions closure
      editTask(groupIndex, taskIndex, task);
      console.error(error);
    }
  }

  function unMockTask() {
    taskChange({ ...task, isMock: false });
    addNewTask();
  }

  return inView ? ( // TODO: maybe add this to a list of viewed on group and render there accordingly (no need to pass anything)
    <div
      className={style['task']}
      ref={taskWrapperRef}
      style={task.isMock ? { opacity: '50%' } : {}}
      onFocus={task.isMock ? unMockTask : null}
    >
      {!task.isMock && (
        <SelectCheckbox
          taskIsSelected={taskIsSelected}
          setTaskIsSelected={setTaskIsSelected}
          taskId={task._id}
          groupIndex={groupIndex}
        />
      )}
      <div className={style['task-handle']}>&#8942;</div>
      {columns.map((column) => {
        return (
          <CellWrapper key={column.id} column={column}>
            {createCell(column)}
          </CellWrapper>
        );
      })}
    </div>
  ) : (
    <div
      key={'task.id'}
      className={style['pseudo-task']}
      ref={taskWrapperRef}
    ></div>
  );
}

Task.propTypes = {};

export default React.memo(Task);
