import React, { useState, useEffect, createContext } from "react";
import { NewTask } from "../misc/NewDataMakers";

import { useImmerReducer } from "use-immer";

import { setCrappyServerData, getCrappyServerData } from "../ServerProvider";

function projectDataReducer(draft, action) {
	function indexItemIdIn(id, Arr) {
		let index = Arr.findIndex((item) => item.id === id);
		if (index === -1) throw new Error("No matching task");
		return index;
	}
	switch (action.type) {
		case "CHANGE_PROJECT_TO":
			return action.project;
		case "ADD_NEW_TASK":
			if (!action.newTask) console.log("ADD_NEW_TASK - adding a new empty task");
			if (!action.group) console.error("ADD_NEW_TASK - no group to add to");
			let newTask = action.newTask ? action.newTask : NewTask(action.group.columns);
			draft.tasks[newTask.id] = newTask;
			draft.groups[indexItemIdIn(action.group.id, draft.groups)].tasksQuerie.push(newTask.id);
			return draft;

		case "ADD_NEW_TASKS": // is this needed ???
			if (!action.newTasks) throw new Error("ADD_NEW_TASKS No new tasks");
			if (!action.group) console.error("ADD_NEW_TASK - no group to add to");
			if (Array.isArray(action.newTasks))
				console.error("ADD_NEW_TASKS new tasks not in array", action.newTasks);
			action.newTasks.forEach((task) => {
				draft.tasks[task.id] = action.task;
				draft.groups[indexItemIdIn(action.group.id, draft.groups)].tasksQuerie.push(task.id); // NOT GOOD - does this update queirie or not??? BAD
			});
			return draft;
		case "EDIT_TASK":
			if (!action.editedTask) throw new Error("EDIT_TASK - no editedTask provided");
			Object.assign(draft.tasks[action.editedTask.id], action.editedTask);
			return draft;

		case "EDIT_CELL":
			draft.tasks[action.taskId][action.cellId].content = action.newContent;
			return draft;
		case "UPDATE_TAB_DATA":
			draft.groups[action.tabData.id] = action.tabData;
			return draft;
		default:
			console.error("NO ACTION FOR REDUCER");
	}
}

export const AppContext = createContext();

function AppContextProvider(props) {
	const [currentUser, setCurrentUser] = useState(null);
	const [viewedProject, setViewedProject] = useState();
	const [projectData, dispatchProjectData] = useImmerReducer(projectDataReducer, null);
	const [appInitState, setAppInitState] = useState("loading");

	/* function dispatchSendProj(dispatchObject){
		dispatchProjectData(dispatchObject).then(setCrappyServerData(projectData))
	} */
	useEffect(() => {
		console.log("CHANGE TO PROJECT - SEND!");
		setCrappyServerData(viewedProject, projectData);
	}, [projectData]);

	console.log("CONTEXT!");
	return (
		<AppContext.Provider
			value={{
				currentUser: currentUser,
				setCurrentUser: setCurrentUser,
				viewedProject: viewedProject,
				setViewedProject: setViewedProject,
				projectData: projectData,
				dispatchProjectData: dispatchProjectData,
				appInitState: appInitState,
				setAppInitState: setAppInitState,
			}}>
			{props.children}
		</AppContext.Provider>
	);
}

AppContextProvider.propTypes = {};

export default AppContextProvider;
