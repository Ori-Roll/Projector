import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import _ from "lodash";
import { useInView } from "react-intersection-observer";

import { changeTask } from "../../../../ServerProvider/task";
import { editTaskDispatch } from "../../../../redux/rootReducer";

import { CellOfType } from "./Cells/CellTypes/CellTypes";
import CellWrapper from "./CellWrapper";

import style from "./Task.module.css";

function Task({ task, columns, taskIndex, groupIndex }) {
	const [taskWrapperRef, inView, entry] = useInView();

	// const [task, setTask] = useState(taskData);

	/* useEffect(() => {
		setTask(taskData);
	}, [taskData]);
 */
	/* const taskRef = useRef(task); */

	const dispatch = useDispatch();
	const editTask = (groupIndex, taskIndex, task) =>
		dispatch(editTaskDispatch(groupIndex, taskIndex, task));

	/* useEffect(() => {
		console.log("%c Task Mount", "font-weight: bold; font-size: 12px; color: pink;");
	}, []); */

	//console.log(`%c ------Task render! did: ${task.cells[2].content}---------`, "color: green");

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

	async function cellChange(newTask) {
		try {
			console.log("new task:  ", newTask);
			// Change on server
			let changedTask = await changeTask(newTask);
			changedTask = changedTask.data;
			/*	// This should check for the individual cell
				console.error("Task on server does not match task change");
				console.log("changeTask.cells ", changedTask.cells);
				console.log("newTask.cells ", newTask.cells);
			} */

			// Change on store - only change the cell (not deepCloned)

			/* editTask(groupIndex, taskIndex, task); */
		} catch (error) {
			console.error(error);
		}
	}

	function doLocalChange(cell) {
		const newCells = _.cloneDeep(task.cells);
		const cellIndex = newCells.findIndex((cellItem) => cellItem.columnMatch === cell.columnMatch);
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

	return inView ? ( // TODO: maby add this to a list of viewed on group and render there accordingly (no need to pass anything)
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
