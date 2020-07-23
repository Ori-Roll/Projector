import React, { useState, useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { NewColumn, NewTask } from "../../../misc/NewDataMakers";

import { AppContext } from "../../../ContextProviders/AppContextProvider";
import MouseMoveWrapper from "../../../misc/MouseMoveWrapper";

import Task from "./Task/Task";
import ColumnsHeadWrapper from "./ColumnsHeadWrapper/ColumnsHeadWrapper";
import TabRightControl from "./TabRightControl/TabRightControl";
import TabHeader from "./TabHeader/TabHeader";

import style from "./Tab.module.css"; // TODO: rename file to lowercase, in my projects it's always style(s).module.css
import { NEW_COLUMN_DATA } from "../../../defaults";
import { queries } from "@testing-library/react";

/* TODO: (Ori) Neads the ability to update the original data from the source after it updetes it one*/
function tabDataReducer(oldData, action) {
	const data = _.cloneDeep(oldData);

	function IdInSubDataIndexer(dataSet, subDataSet) {
		function indexerFunction(id, subDataSet) {
			let index = dataSet[subDataSet].findIndex((item) => {
				return item.id === id;
			});

			if (index === -1) {
				throw new Error("No matching task");
			}
			return index;
		}

		return indexerFunction;
	}

	const indexOfTask = (id) => IdInSubDataIndexer(oldData)(id, "tasks"); // TODO: NOT GOOD REMAKES THE FUNCTION ALL THE TIME
	const indexOfColumn = (id) => IdInSubDataIndexer(oldData)(id, "columns"); // TODO: NOT GOOD REMAKES THE FUNCTION ALL THE TIME

	switch (action.type) {
		/* case "ADD_NEW_TASK":
			let newTask = action.newTask ? action.newTask : NewTask(data.columns);
			data.tasks.push(newTask);
			data.tasksQuerie.push(newTask.id);
			return data; */
		/* 	case "ADD_NEW_TASKS":
			if (!action.newTasks) throw new Error("ADD_NEW_TASKS No new tasks");
			if (Array.isArray(action.newTasks))
			action.newTasks.forEach((task) => {
				data.tasks.push(task); // NOT GOOD - does this update queirie or not??? BAD
			}); 
			return data;*/
		/* case "EDIT_TASK":
			if (!action.editedTask) throw new Error("EDIT_TASK - no editedTask provided");
			const taskIndex = indexOfTask(action.editedTask.id); // CHANGE TO indexOf ????
			data.tasks[taskIndex] = {
				...data.tasks[taskIndex],
				...action.editedTask,
			};
			return data; */
		case "DELETE_TASK":
			if (action.task || action.id) {
				data.tasks.splice(indexOfTask(action.id ? action.id : action.task.id), 1);
			} else {
				throw new Error("DELETE_TASK - no Task or id provided");
			}
			return data;
		case "ADD_NEW_EMPTY_COLUMN":
			if (!action.columnType) throw new Error("ADD_NEW_EMPTY_COLUMN - no columnType provided");
			const newEmptyColumn = NewColumn(action.columnType);
			data.columns.push(newEmptyColumn);
			data.tasks.forEach((task) => {
				task[newEmptyColumn.id] = {
					id: newEmptyColumn.id,
					content: NEW_COLUMN_DATA[newEmptyColumn.type].newCellContent,
				};
			});
			return data;
		case "EDIT_COLUMN":
			if (!action.editedColumn) throw new Error("EDIT_COLUMN - no editedColumn provided");

			let editedData = { ...oldData };
			let editedColumns = [...editedData.columns];
			editedColumns.splice(indexOfColumn(action.editedColumn.id), 1, {
				...editedColumns[indexOfColumn(action.editedColumn.id)],
				...action.editedColumn,
			});
			editedData["columns"] = editedColumns;

			return editedData;

		case "EDIT_ALL_COLUMNS":
			if (!action.newData) throw new Error("EDIT_ALL_COLUMNS - no newData provided");
			data.columns.forEach((element, i) => {
				data.columns[i] = { ...element, ...action.newData };
			});
			return data;
		case "MOVE_COLUMN_AFTER":
			if (!action.column)
				throw new Error("MOVE_COLUMN_AFTER - no column to move - missing: column");
			if (!action.moveAfter)
				throw new Error("MOVE_COLUMN_AFTER - no column to move after -  missing: moveAfter");

			data.columns.splice(indexOfColumn(action.column.id), 1);

			if (indexOfColumn(action.moveAfter.id) >= indexOfColumn(action.column.id)) {
				data.columns.splice(indexOfColumn(action.moveAfter.id), 0, action.column);
			} else {
				data.columns.splice(indexOfColumn(action.moveAfter.id) + 1, 0, action.column);
			}
			return data;
		default:
			throw new Error("tabDataReducer: No action provided");
	}
}
// TODO: "tab" -I would rename this
function Tab({ tabItem, tabTasks }) {
	const [tabData, changeTabData] = useReducer(tabDataReducer, tabItem);
	const { dispatchProjectData } = useContext(AppContext);

	const [tabIsOpen, setTabIsOpen] = useState(true); // TODO: (Ori) this needs to initially come from backend
	function toggleTabIsOpen() {
		setTabIsOpen(!tabIsOpen);
	}

	useEffect(() => {
		console.log("%c TAB MOUNT (effect!)", "font-weight: bold; font-size: 15px; color: red;");
		/* let tasks = [];
		tabItem.tasksQuerie.forEach((querie) => tasks.push(projectTasks[querie])); */
		/* dispatchProjectData({
			type: "TAB_APPEND_QUERIES",
			queries: tabItem.tasksQuerie,
			tabId: tabItem.id,
		}); */
	}, []);
	useEffect(
		_.debounce(() => updateTabInProject(), 2000),
		[tabData]
	);

	const [draggedColumn, setDraggedColumn] = useState(null);
	const [resizedColumn, setResizedColumn] = useState(null);
	const [mouseXposition, setMouseXposition] = useState(0);

	function updateTabInProject() {
		dispatchProjectData({ type: "UPDATE_TAB_DATA", tabData: tabData });
	}

	// TODO: choose drag and drop package, consider this: https://github.com/atlassian/react-beautiful-dnd
	return (
		<MouseMoveWrapper
			key={`MMWrapper${tabData.id}`}
			draggedColumn={draggedColumn}
			setDraggedColumn={setDraggedColumn}
			resizedColumn={resizedColumn}
			setResizedColumn={setResizedColumn}
			mouseXposition={mouseXposition}
			setMouseXposition={setMouseXposition}
			changeTabData={changeTabData}
			updateTabInProject={updateTabInProject}>
			<div className={style.tab}>
				<div className={style["tab-header-wrapper"]}>
					<TabHeader tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} tabItem={tabItem} />
				</div>

				<div /* TODO add classcat package. className={cc([style["tab-content-wrapper"], {[style.open]: tabIsOpen}])} */
					className={style["tab-content-wrapper"]} /* TODO add classcat package:  */
					style={!tabIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
					{/* TODO use class open */}
					<ColumnsHeadWrapper
						key={`${tabData.id}Head`}
						tabData={tabData}
						changeTabData={changeTabData}
						draggedColumn={draggedColumn}
						setDraggedColumn={setDraggedColumn}
						setResizedColumn={setResizedColumn}
					/>
					{/* <TaskCopy task={"C"} /> */}
					{tabTasks.map((task) => {
						return (
							<Task
								key={task.id}
								task={task}
								columns={tabData.columns}
								changeTabData={changeTabData}
								resizedColumn={resizedColumn}
								draggedColumn={draggedColumn}
							/>
						);
					})}
				</div>
				<div
					className={style["tab-right-control-wrapper"]}
					style={!tabIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
					<TabRightControl changeTabData={changeTabData} />
				</div>
				<div className={style["tab-scroll-end-gradiant"]} />
			</div>
		</MouseMoveWrapper>
	);
}

Tab.propTypes = {};

export default Tab;

/* 
useEffect(() => {
	changeTabData({
		editedTask: { id: "a", "001": { content: "changed Task" }, "002": { content: 5 } },
		type: "EDIT_TASK",
	});
	changeTabData({ newTask: newTask(tabData), type: "ADD_NEW_TASK" });
	changeTabData({
		id: "b",
		type: "DELETE_TASK",
	});
}, []); */

/* function indexOfTask(id) {
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
	} */
