import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { createNewTask } from "../../../../ServerProvider/task";

import style from "./TaskAddFooter.module.css";

function TaskAddFooter({ group, setTasks }) {
	const user = useSelector((state) => state?.user);

	const [loadingTask, setLoadingTask] = useState(false);

	async function addTaskClick() {
		// TODO: create a cached task for fast creating (needs to change according to group/columns) - theres a visible field I can use
		setLoadingTask(true);

		const task = await createNewTask({
			title: "-",
			assignedTo: [user._id],
			project: group.project, //TODO: better get this from global/store
			group: group._id,
		});
		console.log(`Setting new task to task.data `, task.data);
		setTasks((oldTasks) => [...oldTasks, task.data]);
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
