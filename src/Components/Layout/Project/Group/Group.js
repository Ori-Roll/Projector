import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { db_createNewTask } from '../../../../ServerProvider/tasks';
import { addTaskDispatch } from '../../../redux/rootReducer';

import Task from './Task/Task';
import TaskAddFooter from './TaskAddFooter/TaskAddFooter';
import ColumnsHeadWrapper from './ColumnsHeadWrapper/ColumnsHeadWrapper';
import GroupHeader from './GroupHeader/GroupHeader';
import Loader from '../../../../GlobalComponents/Loader/Loader';

import style from './Group.module.css'; // TODO: rename file to lowercase, in my projects it's always style(s).module.css

function Group({ group, groupIndex }) {
  const [groupIsOpen, setGroupIsOpen] = useState(true); // TODO: (Ori) this needs to initially come from backend

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const addTask = (task, groupIndex) =>
    dispatch(addTaskDispatch(task, groupIndex));

  async function addNewTask() {
    try {
      const newTask = {
        title: '-',
        assignedTo: [user._id],
        project: group.project, //TODO: better get this from global/store
        group: group._id,
        isMock: true,
      };
      let task = await db_createNewTask(newTask);
      task = task.data;
      addTask(task, groupIndex);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (
      group.tasks &&
      group.tasks[group.tasks.length - 1] &&
      group.tasks[group.tasks.length - 1].isMock === false
    ) {
      addNewTask();
    }
  }, []);

  return (
    /* TODO add classcat package:  */
    <div className={style['group']}>
      <div className={style['group-header-wrapper']}>
        <GroupHeader
          groupIsOpen={groupIsOpen}
          setGroupIsOpen={setGroupIsOpen}
          group={group}
          groupIndex={groupIndex}
        />
      </div>
      <div
        className={style['group-content-wrapper']}
        style={!groupIsOpen ? { backgroundColor: 'red', display: 'none' } : {}}
      >
        <ColumnsHeadWrapper
          key={group._id}
          columns={group.columns}
          groupIndex={groupIndex}
        />
        {group.loaded ? (
          group.tasks.map((task, i) => {
            return (
              <Task
                key={task._id}
                task={task}
                columns={group.columns}
                taskIndex={i}
                groupIndex={groupIndex}
                addNewTask={addNewTask}
              />
            );
          })
        ) : (
          <Loader message={'Loading group'} />
        )}
      </div>
    </div>
  );
}

Group.propTypes = {};

export default Group;
