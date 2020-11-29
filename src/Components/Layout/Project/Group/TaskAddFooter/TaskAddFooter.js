import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { addTaskDispatch } from "../../../../redux/rootReducer";

import { db_createNewTask } from "../../../../ServerProvider/tasks";

import style from "./TaskAddFooter.module.css";

function TaskAddFooter({ group, groupIndex }) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state?.user);
	const addTask = (task, groupIndex) => dispatch(addTaskDispatch(task, groupIndex));

	const [loadingTask, setLoadingTask] = useState(false);

	async function addTaskClick() {
		// TODO: create a cached task for fast creating (needs to change according to group/columns) - theres a visible field I can use
		setLoadingTask(true);

		try {
			let task = await db_createNewTask({
				title: "-",
				assignedTo: [user._id],
				project: group.project, //TODO: better get this from global/store
				group: group._id,
				isMock: true
			});
			task = task.data;
			addTask(task, groupIndex);
		} catch (error) {
			console.error(error);
		}
		setLoadingTask(false);
	}

	return loadingTask ? (
		<div>TaskLoader</div>
	) : (
		<div className={style["task-add"]} onClick={addTaskClick} />
	);
}

TaskAddFooter.propTypes = {};

export default TaskAddFooter;
