import React, { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import defaults from "../../defaults/";
import { makeKey } from "../../misc/";
import MouseMoveWrapper from "../../misc/MouseMoveWrapper";

import Task from "./Task/Task";
import ColumnsHeadWrapper from "./ColumnsHeadWrapper/ColumnsHeadWrapper";
import TabHeader from "./TabHeader/TabHeader";

import style from "./Tab.module.css"; // TODO: rename file to lowercase, in my projects it's always style(s).module.css

//TODO: USE LODASH FOR DEEP COPY (MAYBE)
function tabDataReducer(oldData, action) {
	const data = _.cloneDeep(oldData);

	function indexOfTask(id) {
		let index = oldData.tasks.findIndex((t) => {
			return t.id === id;
		});
		if (index === -1) {
			throw new Error("No matching task");
		}
		return index;
	}

	function indexOfColumn(id) {
		let index = oldData.columns.findIndex((col) => {
			return col.id === id;
		});
		if (index === -1) {
			throw new Error("No matching task");
		}
		return index;
	}

	switch (action.type) {
		case "ADD_NEW_TASK":
			data.tasks.push(action.newTask);
			return data;
		case "EDIT_TASK":
			if (!action.newTask) throw new Error("EDIT_TASK - no newTask provided");
			data.tasks[indexOfTask(action.newTask.id)] = {
				...data.tasks[indexOfTask(action.newTask.id)],
				...action.newTask,
			};
			return data;
		case "DELETE_TASK":
			if (action.task || action.id) {
				data.tasks.splice(indexOfTask(action.id ? action.id : action.task.id), 1);
			} else {
				throw new Error("DELETE_TASK - no Task or id provided");
			}
			return data;
		case "EDIT_COLUMN":
			if (!action.newColumn) throw new Error("EDIT_COLUMN - no newColumn provided");
			data.columns[indexOfColumn(action.newColumn.id)] = {
				...data.columns[indexOfColumn(action.newColumn.id)],
				...action.newColumn,
			};
			return data;
		case "EDIT_ALL_COLUMNS":
			if (!action.newData) throw new Error("EDIT_ALL_COLUMNS - no newData provided");
			data.columns.forEach((element, i) => {
				data.columns[i] = { ...element, ...action.newData };
			});
			return data;
		default:
			throw new Error("tabDataReducer: No action provided");
	}
}

function Tab({ tabItem }) {
	/* TODO: (Ori) Neads to be a reducer with the ability to update the original data from the source after it updetes it one*/
	const [tabData, changeTabData] = useReducer(tabDataReducer, _.cloneDeep(tabItem));
	// TODO: I would rename this
	const [tabIsOpen, setTabIsOpen] = useState(true); // TODO: (Ori) this needs to initially come from backend

	function toggleTabIsOpen() {
		setTabIsOpen(!tabIsOpen);
	}

	function newTask(tabData) {
		// This should use the "new" keyword and be a method
		const newTask = { id: makeKey() };
		tabData.columns.forEach((column) => {
			newTask[column.id] = { content: defaults.CONTENT_FOR_CELL_TYPE[column.type] };
		});
		return newTask;
	}

	const [columnIsDragged, setColumnIsDragged] = useState(false);
	const [mouseXposition, setMouseXposition] = useState(0);

	// TODO: choose drag and drop package, consider this: https://github.com/atlassian/react-beautiful-dnd
	return (
		<MouseMoveWrapper
			columnIsDragged={columnIsDragged}
			setMouseXposition={setMouseXposition}
			setColumnIsDragged={setColumnIsDragged}
			changeTabData={changeTabData}>
			<div className={style.tab}>
				{/* change holder to wrapper, consider removing this */}
				<div className={style["tab-header-holder"]}>
					<TabHeader tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
				</div>

				<div /* TODO add classcat package. className={cc([style["tab-content-holder"], {[style.open]: tabIsOpen}])} */
					className={style["tab-content-holder"]} /* TODO add classcat package:  */
					style={!tabIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
					{" "}
					{/* TODO use class open */}
					<ColumnsHeadWrapper
						columns={tabData.columns}
						changeTabData={changeTabData}
						mouseXposition={mouseXposition}
						columnIsDragged={columnIsDragged}
						setColumnIsDragged={setColumnIsDragged}
					/>
					{tabData.tasks.map((task) => {
						return <Task key={task.id} task={task} columns={tabData.columns} />;
					})}
				</div>
			</div>
		</MouseMoveWrapper>
	);
}

Tab.propTypes = {};

export default Tab;

/* 
useEffect(() => {
	changeTabData({
		newTask: { id: "a", "001": { content: "changed Task" }, "002": { content: 5 } },
		type: "EDIT_TASK",
	});
	changeTabData({ newTask: newTask(tabData), type: "ADD_NEW_TASK" });
	changeTabData({
		id: "b",
		type: "DELETE_TASK",
	});
}, []); */
