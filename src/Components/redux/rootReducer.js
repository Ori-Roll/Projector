import { combineReducers, createStore } from "redux";

import { produce } from "immer";

function userReducer(state = {}, action) {
	const x = produce(state, (draft) => {
		switch (action.type) {
			case "SET_USER":
				return action.user;
			default:
				return draft;
		}
	});
	return x;
}

function appReducer(state = {}, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case "SET_VIEWED_PROJECT":
				draft.viewedProject = action.project;
				break;
			case "SET_APP_STATE":
				draft.appState = action.newState;
				break;
			case "CHANGE_APP_GLOBALS":
				draft.globals = {...draft.globals, ...action.globalsToChange}
				break;
			default:
				return draft;
		}
	});
}

function projectReducer(state = {}, action) {
	function indexItemIdIn(id, Arr) {
		let index = Arr.findIndex((item) => item.id === id);
		if (index === -1) throw new Error("No matching task");
		return index;
	}

	return produce(state, (draft) => {
		switch (action.type) {
			case "CHANGE_PROJECT_TO":
				return action.project;
			case "SET_PROJECT_GROUP":
				draft.groups.splice(indexItemIdIn(action.group._id, draft.groups), 1, action.group);
				break;
			case "SET_PROJECT_GROUPS":
				draft.groups = action.groups;
				break;
			case "ADD_TASK":
				draft.groups[action.groupIndex].tasks.push(action.task);
				break;
			case "EDIT_TASK":
				console.log("--------------------")	
			console.log(action.groupIndex);
				console.log(action.taskIndex);
				console.log(action.task)
				draft.groups[action.groupIndex].tasks[action.taskIndex] = action.task;
				break;
			case "EDIT_CELL":
				draft.groups[action.groupIndex].tasks[action.taskIndex].cells[action.cellIndex] =
					action.cell;
				break;
			case "ADD_NEW_COLUMN_INIT":
				// TODO: start updating status
				draft.groups[action.groupIndex].columnLoading = true;
				break;
			case "ADD_NEW_COLUMN_SUCCESS":
				// TODO: remove updating status
				draft.groups[action.groupIndex].columns = action.group.columns;
				draft.groups[action.groupIndex].tasks = action.group.tasks;
				draft.groups[action.groupIndex].columnLoading = false;
				break;
			case "ADD_NEW_COLUMN_FAILED":
				// TODO: error for user
				draft.groups[action.groupIndex].columnLoading = false;
				break;
			case "EDIT_COLUMN_INIT":
				// TODO: start updating status
				draft.groups[action.groupIndex].columns[action.columnIndex] = action.column;
				break;
			case "EDIT_COLUMN_SUCCESS":
				draft.groups[action.groupIndex].columns[action.columnIndex] = action.column;
				// TODO: remove updating status
				break;
			case "EDIT_COLUMN_FAILED":
				// TODO: error for user
				draft.groups[action.groupIndex].columns[action.columnIndex] = action.column;
				
				break;
			case "RESIZE_COLUMN":
				draft.groups[action.groupIndex].columns[action.columnIndex].width = action.width;
			/* case "ADD_NEW_TASK":
				if (!action.group) console.error("ADD_NEW_TASK - no group to add to");
				let newTask = action.newTask;
				draft.tasks[newTask.id] = newTask;
				draft.groups[indexItemIdIn(action.group.id, draft.groups)].tasksQuerie.push(newTask.id);
				break; */

			/* case "ADD_NEW_TASKS": // is this needed ???
                if (!action.newTasks) throw new Error("ADD_NEW_TASKS No new tasks");
                if (!action.group) console.error("ADD_NEW_TASK - no group to add to");
                if (Array.isArray(action.newTasks))
                    console.error("ADD_NEW_TASKS new tasks not in array", action.newTasks);
                action.newTasks.forEach((task) => {
                    draft.tasks[task.id] = action.task;
                    draft.groups[indexItemIdIn(action.group.id, draft.groups)].tasksQuerie.push(task.id); // NOT GOOD - does this update queirie or not??? BAD
                });
                return draft; */
			/* case "EDIT_TASK":
				if (!action.editedTask) throw new Error("EDIT_TASK - no editedTask provided");
				Object.assign(draft.tasks[action.editedTask.id], action.editedTask);
				break; */
			/* case "EDIT_CELL":
                draft.tasks[action.taskId][action.cellId].content = action.newContent;
                return draft; */

			default:
				return draft;
		}
	});
}

const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	project: projectReducer,
});

const store = createStore(rootReducer);

export function setUserDispatch(user) {
	return {
		type: "SET_USER",
		user: user,
	};
}

export function setProjectDispatch(project) {
	return {
		type: "CHANGE_PROJECT_TO",
		project: project,
	};
}

export function changeProjectGroupDispatch(group) {
	// This is for the whole group
	return {
		type: "SET_PROJECT_GROUP",
		group: group,
	};
}

export function setProjectGroupsDispatch(groups) {
	// This is for the whole group
	return {
		type: "SET_PROJECT_GROUPS",
		groups: groups,
	};
}

export function setAppStateDispatch(state) {
	return {
		type: "SET_APP_STATE",
		state: state,
	};
}

export function changeAppGlobalsDispatch(globalsToChange) {
	return {
		type: "CHANGE_APP_GLOBALS",
		globalsToChange: globalsToChange,
	};
}

export function addTaskDispatch(task, groupIndex) {
	return {
		type: "ADD_TASK",
		task: task,
		groupIndex: groupIndex,
	};
}

export function editTaskDispatch(groupIndex, taskIndex, task) {
	return {
		type: "EDIT_TASK",
		groupIndex: groupIndex,
		taskIndex: taskIndex,
		task: task,
	};
}

export function editCellDispatch(cell, cellIndex, taskIndex, groupIndex) {
	return {
		type: "EDIT_CELL",
		cell: cell,
		cellIndex: cellIndex,
		taskIndex: taskIndex,
		groupIndex: groupIndex,
	};
}

export function addNewColumnInitDispatch(groupIndex) {
	return {
		type: "ADD_NEW_COLUMN_INIT",
		groupIndex: groupIndex,
	};
}

export function addNewColumnSuccessDispatch(group, groupIndex) {
	return {
		type: "ADD_NEW_COLUMN_SUCCESS",
		group: group,
		groupIndex: groupIndex,
	};
}

export function addNewColumnFailedDispatch(groupIndex) {
	return {
		type: "ADD_NEW_COLUMN_FAILED",
		groupIndex: groupIndex,
	};
}

export function editColumnInitDispatch(groupIndex, columnIndex, column) {
	return {
		type: "EDIT_COLUMN_INIT",
		groupIndex: groupIndex,
		columnIndex: columnIndex,
		column: column,
	};
}


export function editColumnSuccessDispatch(groupIndex, columnIndex, column) {
	return {
		type: "EDIT_COLUMN_SUCCESS",
		groupIndex: groupIndex,
		columnIndex: columnIndex,
		column: column,
	};
}
export function editColumnFailedDispatch(groupIndex, columnIndex, column) {
	return {
		type: "EDIT_COLUMN_FAILED",
		groupIndex: groupIndex,
		columnIndex: columnIndex,
		column: column,
	};
}


// TODO: Check if this can go under edit column
export function resizeColumnDispatch(groupIndex, columnIndex, width) {
	return {
		type: "RESIZE_COLUMN",
		groupIndex: groupIndex,
		columnIndex: columnIndex,
		width: width,
	};
}

export default store;

