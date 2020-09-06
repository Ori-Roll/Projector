import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import _ from "lodash";

import { CellOfType } from "./Cells/CellTypes/CellTypes";
import { AppContext } from "../../../../ContextProviders/AppContextProvider";

import TextCell from "./Cells/TextCell/TextCell";
import CellWrapper from "./CellWrapper";

import Spacer from "./Spacer/Spacer";
import style from "./Task.module.css";

const renders = [];

function Task({ task, columns, resizedColumn, draggedColumn }) {
	const [taskRef, inView, entry] = useInView();

	const { dispatchProjectData } = useContext(AppContext);

	/* let task, columns, changeGroupData, resizedColumn, draggedColumn;
	if (inView  || (!props.resizedColumn && !props.draggedColumn)) {
		task = props.task;
		columns = props.columns;
		changeGroupData = props.changeGroupData;
		resizedColumn = props.resizedColumn;
		draggedColumn = props.draggedColumn;
	} else {
		console.log("%c Task Psoudo Render", "color: gray");
	} */

	/* 	console.log(`%c ------Task render! did: ${task.id}---------`, "color: green"); */

	useEffect(() => {
		/* console.log("%c Task Mount", "font-weight: bold; font-size: 12px; color: pink;"); */
	}, []);

	function createCell(column = () => console.error("no column for cell")) {
		if (!column.type) throw new Error("No column.type for cell");
		if (!task.hasOwnProperty(column.id)) {
			console.log(`task with no key for column.id ${column.id}`);
			return CellOfType[column.type](Math.random(), column.newCellContent, doCellContentChange);
		} else {
			/* console.log(`%c new Cell - content ${task[column.id].content}`, "color:green"); */
			return CellOfType[column.type](column.id, task[column.id].content, doCellContentChange);
		}
	}

	function doCellContentChange(id, content, debounced) {
		if (debounced) {
			delayedCellContentDispatch(id, content, task);
		} else {
			cellContentDispatch(id, content, task);
		}
	}

	/* const delayedChangeGroupData = useRef(() => changeGroupData).current; */

	function cellContentDispatch(id, content, task) {
		dispatchProjectData({ type: "EDIT_CELL", taskId: task.id, cellId: id, newContent: content });
	}

	const delayedCellContentDispatch = useRef(
		_.debounce((id, content, task) => {
			if (!content) console.error("No content for debounce");
			console.log("delayed ...");
			cellContentDispatch(id, content, task);
		}, 200)
	).current;

	return inView ? ( //maby add this to a list of viewed on group and render there accordingly (no need to pass anything)
		<div className={style["task"]} ref={taskRef}>
			{columns.map((column) => {
				return <CellWrapper key={column.id} column={column} createCell={createCell} />;
			})}
		</div>
	) : (
		<div key={"task.id"} className={style["pseudo-task"]} ref={taskRef}></div>
	);
}

Task.propTypes = {};

export default Task;
