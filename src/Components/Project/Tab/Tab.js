import React, { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import defaults from "../../defaults/";

import Task from "./Task/Task";
import ColumnsHead from "./ColumnsHead/ColumnsHead";
import TabHeader from "./TabHeader/TabHeader";
import TabArrow from "./TabArrow/TabArrow";

import style from "./Tab.module.css"; // TODO: rename file to lowercase, in my projects it's always style(s).module.css

//TODO: USE LODASH FOR DEEP COPY (MAYBE)
function tabDataReducer(oldData, action) {
	const data = _.cloneDeep(oldData);

	function indexForTaskId(id) {
		return oldData.tasks.findIndex((task) => task.id === id);
	}

	switch (action.type) {
		case "ADD_NEW_TASK":
			data.tasks.push(action.newTask);
			return data;
		case "CHANGE_TASK":
			if (!action.newTask) throw new Error("CHANGE_TASK - no newTask provided");
			data.tasks[indexForTaskId(action.newTask.id)] = {
				...data.tasks[indexForTaskId(action.newTask.id)],
				...action.newTask,
			};
			return data;
		case "DELETE_TASK":

		default:
			console.error("No action provided");
	}
}

function Tab({ tabItem }) {
	/* TODO: (Ori) Neads to be a reducer with the ability to update the original data from the source after it updetes it one*/
	const [tabData, changeTabData] = useReducer(tabDataReducer, tabItem);

	// TODO: I would rename this
	const [tabIsOpen, setTabIsOpen] = useState(true); // TODO: (Ori) this needs to initially come from backend

	function toggleTabIsOpen() {
		setTabIsOpen(!tabIsOpen);
	}

	useEffect(() => {
		changeTabData({
			newTask: { id: "a", "001": { content: "asdfkhdsbgkf" }, "002": { content: 5 } },
			type: "CHANGE_TASK",
		});
	}, []);

	// TODO: choose drag and drop package, consider this: https://github.com/atlassian/react-beautiful-dnd
	return (
		<div className={style.tab}>
			<div className={style["tab-side-holder"]}>
				{" "}
				{/* change holder to wrapper, consider removing this */}
				<TabArrow tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
			</div>
			<div className={style["tab-header-holder"]}>
				<TabHeader tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
			</div>

			<div /* TODO add classcat package:  */
				/* className={cc([style["tab-content-holder"], {[style.open]: tabIsOpen}])} */ className={
					style["tab-content-holder"]
				} /* TODO add classcat package:  */
				style={!tabIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
				{" "}
				{/* TODO use class open */}
				<ColumnsHead columns={tabData.columns} />
				{tabData.tasks.map((task) => {
					return <Task key={task.id} task={task} columns={tabData.columns} />;
				})}
			</div>
		</div>
	);
}

Tab.propTypes = {};

export default Tab;
