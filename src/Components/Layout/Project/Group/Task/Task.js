import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import _ from "lodash";

import { CellOfType } from "./Cells/CellTypes/CellTypes";
import { AppContext } from "../../../../ContextProviders/AppContextProvider";

import { changeTask } from "../../../../ServerProvider/task";

import TextCell from "./Cells/TextCell/TextCell";
import CellWrapper from "./CellWrapper";

import Spacer from "./Spacer/Spacer";
import style from "./Task.module.css";

const renders = [];

function Task({ task, columns, resizedColumn }) {
	const [taskRef, inView, entry] = useInView();

	/* 	console.log(`%c ------Task render! did: ${task.id}---------`, "color: green"); */

	useEffect(() => {
		console.log("%c Task Mount", "font-weight: bold; font-size: 12px; color: pink;");
	}, []);

	function createCell(column = () => console.error("no column for cell")) {
		if (!column.type) throw new Error("No column.type for cell");
		const cell = task.cells.find((cell) => cell.columnMatch === column._id);
		if (!cell) {
			console.error(`task with no cell match for column.id ${column.id}`);
		} else {
			return CellOfType[column.type](column._id, cell.content, cellChange);
		}

		/* if (!task.cells.find(cell => )) {
			console.log(`task with no key for column.id ${column.id}`);
			return CellOfType[column.type](Math.random(), column.newCellContent, doCellContentChange);
		} else { */
		/* console.log(`%c new Cell - content ${task[column.id].content}`, "color:green"); */
		/* return CellOfType[column.type](column.id, task[column.id].content, doCellContentChange); */
		/* } */
	}
	function cellChange(id, content, task) {}

	/* const delayedCellChange = useRef(
		_.debounce((id, content, task) => {
			if (!content) console.error("No content for debounce");
			console.log("delayed ...");
			cellChange(id, content, task);
		}, 200)
	).current;

	function cellChange(id, content, debounced) {
		if (debounced) {
			delayedCellChange(id, content, task);
		} else {
			cellChange(id, content, task);
		}
	} */

	/* const delayedChangeGroupData = useRef(() => changeGroupData).current; */

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
