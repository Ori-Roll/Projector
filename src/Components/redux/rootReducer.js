import { combineReducers, createStore } from "redux";

import { produce } from "immer";

function userReducer(state = {}, action) {
	console.log("2");
	const x = produce(state, (draft) => {
		switch (action.type) {
			case "SET_CURRENT_USER":
				return action.user;
			default:
				return draft;
		}
	});
	console.log("4 - state is ", x);
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
			case "ADD_NEW_TASK":
				if (!action.group) console.error("ADD_NEW_TASK - no group to add to");
				let newTask = action.newTask;
				draft.tasks[newTask.id] = newTask;
				draft.groups[indexItemIdIn(action.group.id, draft.groups)].tasksQuerie.push(newTask.id);
				break;

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
			case "EDIT_TASK":
				if (!action.editedTask) throw new Error("EDIT_TASK - no editedTask provided");
				Object.assign(draft.tasks[action.editedTask.id], action.editedTask);
				break;
			/* case "EDIT_CELL":
                draft.tasks[action.taskId][action.cellId].content = action.newContent;
                return draft; */
			case "UPDATE_GROUP_DATA":
				draft.groups[action.groupData.id] = action.groupData;
				break;
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
	console.log("1");
	return {
		type: "SET_CURRENT_USER",
		user: user,
	};
}

export function setProjectDispatch(project) {
	return {
		type: "SET_VIEWED_PROJECT",
		project: project,
	};
}

export function setAppStateDispatch(state) {
	return {
		type: "SET_APP_STATE",
		state: state,
	};
}

export default store;

/* 
function rootReducer(state = {}, action) {
	const [viewedProject, setViewedProject] = useState();
	const [appInitState, setAppInitState] = useState("loading");
 
	 function dispatchSendProj(dispatchObject){
		dispatchProjectData(dispatchObject).then(setCrappyServerData(projectData))
	} 
 	useEffect(() => {
		console.log("CHANGE TO PROJECT - SEND!");
		setCrappyServerData(viewedProject, projectData);
	}, [projectData]);
 
	 console.log("CONTEXT!");
	return (
		<AppContext.Provider
			value={{
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
 */
