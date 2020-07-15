import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import _ from "lodash";

import { CellOfType } from "./Cells/CellTypes/CellTypes";

import TextCell from "./Cells/TextCell/TextCell";
import CellWrapper from "./CellWrapper";

import Spacer from "./Spacer/Spacer";
import style from "./Task.module.css";

const renders = [];

function Task({ task, columns, changeTabData, resizedColumn, draggedColumn }) {
	const [taskRef, inView, entry] = useInView();

	/* let task, columns, changeTabData, resizedColumn, draggedColumn;
	if (inView  || (!props.resizedColumn && !props.draggedColumn)) {
		task = props.task;
		columns = props.columns;
		changeTabData = props.changeTabData;
		resizedColumn = props.resizedColumn;
		draggedColumn = props.draggedColumn;
	} else {
		console.log("%c Task Psoudo Render", "color: gray");
	} */

	useEffect(() => {
		console.log("%c Task Mount", "font-weight: bold; font-size: 15px; color: red;");
	}, []);

	function createCell(column = () => console.error("no column for cell")) {
		if (!column.type) throw new Error("No column.type for cell");
		if (task.isMock || !task.hasOwnProperty(column.id)) {
			console.log(task.isMock ? "task.isMock" : `task with no key for(column.id)${column.id}`);
			return CellOfType[column.type](Math.random(), column.newCellContent, doCellContentChange);
		} else {
			/* console.log(`%c new Cell - content ${task[column.id].content}`, "color:green"); */
			/* return (
				<TextCell
					key={column.id}
					id={column.id}
					content={task[column.id].content}
					doCellContentChange={doCellContentChange}
				/>
			); */
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

	/* const delayedChangeTabData = useRef(() => changeTabData).current; */

	function cellContentDispatch(id, content, task) {
		let editedTask = { ...task };
		console.log("dispatch editedTask", editedTask);
		editedTask[id].content = content;
		changeTabData({ editedTask: editedTask, type: "EDIT_TASK" });
	}

	const delayedCellContentDispatch = useRef(
		_.debounce((id, content, task) => {
			if (!content) console.error("No content for debounce");
			console.log("delayed ...");
			cellContentDispatch(id, content, task);
		}, 100)
	).current;

	return inView ? (
		<div className={style["task"]} ref={taskRef}>
			{columns.map((column) => {
				return (
					<CellWrapper
						key={column.id}
						column={column}
						createCell={createCell}
						resizing={resizedColumn ? true : false}
						dragging={draggedColumn ? true : false}
					/>
				);
			})}
		</div>
	) : (
		<div key={"task.id"} className={style["pseudo-task"]} ref={taskRef}></div>
	);
}

Task.propTypes = {};

export default Task;

/* return inView ? (
		<div key={"task.id"} className={style["task"]} ref={taskRef}>
			{console.log("HERE-1")}
			{columns.map((column) => {
				const spacerWidth = column.spacer;
				return (
					<div
						key={column.id}
						className={style["cell-wrapper"]}
						style={task.isMock ? { opacity: "50%" } : {}}>
						{console.log("HERE-2")}
						<div
							style={
								column.isDragged
									? { width: cellWrapperWidth, opacity: "20%" }
									: { width: cellWrapperWidth }
							}>
							{console.log("HERE-3")}
							{createCell(column)}
						</div>
						<Spacer spacerWidth={spacerWidth} />
					</div>
				);
			})}
		</div>
	) : (
		<div key={"task.id"} className={style["pseudo-task"]} ref={taskRef}></div>
	); */
