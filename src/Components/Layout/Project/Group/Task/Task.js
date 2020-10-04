import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { editCellDispatch } from "../../../../redux/rootReducer";
import _, { assign } from "lodash";

import { useInView } from "react-intersection-observer";

import { changeTask } from "../../../../ServerProvider/task";

import { CellOfType } from "./Cells/CellTypes/CellTypes";
import CellWrapper from "./CellWrapper";

import style from "./Task.module.css";

function Task({ task: taskData, columns, taskIndex, groupIndex }) {
	const [taskWrapperRef, inView, entry] = useInView();

	const [task, setTask] = useState(taskData);

	/* const taskRef = useRef(task); */

	const dispatch = useDispatch();
	const editCell = (cell, cellIndex, taskIndex, groupIndex) =>
		dispatch(editCellDispatch(cell, cellIndex, taskIndex, groupIndex));
	/* 	console.log(`%c ------Task render! did: ${task.id}---------`, "color: green"); */

	useEffect(() => {
		/* console.log("%c Task Mount", "font-weight: bold; font-size: 12px; color: pink;"); */
	}, []);

	function createCell(column = () => console.error("no column for cell")) {
		if (!column.type) throw new Error("No column.type for cell");
		const cell = task.cells.find((cell) => cell.columnMatch === column._id);
		if (!cell) {
			console.error(`task with no cell match for column.id ${column.id}`);
		} else {
			let options = [];
			if (column.type === "assign") options.push(task.assignedTo);
			return CellOfType[column.type](cell, doCellChange, ...options);
		}
	}

	let taskChanges = useRef();

	async function cellChange(newTask) {
		//debugger;
		try {
			if (!newTask) {
				console.log("no newTask");
				newTask = task;
			}
			console.log("new task:  ", task);
			// Change on server
			let changedTask = await changeTask(newTask);
			changedTask = changedTask.data;
			if (newTask.cells !== changedTask.cells) {
				// This should check for the individual cell
				console.error("Task on server does not match task change");
				console.log("changeTask.cells ", changedTask.cells);
				console.log("newTask.cells ", newTask.cells);
			}
			// Change on store - only change the cell (not deepCloned)
			// editCell(cell, cellIndex, taskIndex, groupIndex);
		} catch (error) {
			console.error(error);
		}
	}

	function doCellChange(cell, debounced) {
		function doLocalChange() {
			const newCells = [...task.cells];
			newCells[newCells.findIndex((cellItem) => cellItem.columnMatch === cell.columnMatch)] = cell;
			const newTask = { ...task, cells: newCells };
			setTask(newTask);
			console.log("did setTask", newTask);
			return newTask;
		}

		const delayedCellChange = _.debounce(() => {
			cellChange();
		}, 800);

		if (debounced) {
			console.log("will debounce");
			const newTask = doLocalChange();
			/* console.log("newTask created, its now ", newTask); */
			delayedCellChange();
		} else {
			console.log("action now");
			const newTask = doLocalChange();
			delayedCellChange.cancel();
			cellChange(newTask);
		}
	}

	/* const delayedChangeGroupData = useRef(() => changeGroupData).current; */

	return inView ? ( //maby add this to a list of viewed on group and render there accordingly (no need to pass anything)
		<div className={style["task"]} ref={taskWrapperRef}>
			{columns.map((column) => {
				return (
					<CellWrapper key={column.id} column={column}>
						{createCell(column)}
					</CellWrapper>
				);
			})}
		</div>
	) : (
		<div key={"task.id"} className={style["pseudo-task"]} ref={taskWrapperRef}></div>
	);
}

Task.propTypes = {};

export default React.memo(Task);
