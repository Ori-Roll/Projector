import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { editCellDispatch } from "../../../../redux/rootReducer";
import _ from "lodash";

import { useInView } from "react-intersection-observer";

import { changeTask } from "../../../../ServerProvider/task";

import { CellOfType } from "./Cells/CellTypes/CellTypes";
import CellWrapper from "./CellWrapper";

import style from "./Task.module.css";

function Task({ task, columns, taskIndex, groupIndex }) {
	const [taskWrapperRef, inView, entry] = useInView();
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
			return CellOfType[column.type](cell, doCellChange);
		}
	}
	async function cellChange(cell) {
		try {
			// Change on server
			var changedTask = _.cloneDeep(task); //TODO: BAD! but if I deepclone it creates rerenders!
			const cellIndex = changedTask.cells.findIndex((cellItem) => cellItem._id === cell._id);
			changedTask.cells[cellIndex] = cell;
			changedTask = await changeTask(changedTask);
			changedTask = changedTask.data;
			if (changedTask.cells[cellIndex].content !== cell.content)
				console.error("Task on server does not match task change");

			// Change on store - only change the cell (not deepCloned)
			editCell(cell, cellIndex, taskIndex, groupIndex);
		} catch (error) {
			console.error(error);
		}
	}

	const delayedCellChange = _.debounce((cell) => {
		cellChange(cell);
	}, 400);

	function doCellChange(cell, debounced) {
		if (debounced) {
			delayedCellChange(cell);
		} else {
			cellChange(cell);
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
