import React, { useState, useReducer, createContext } from "react";

import { useImmerReducer } from "use-immer";

function projectTabsReducer(draft, action) {
	/* switch (action.type) {
		case "ADD_NEW"
	} */
}
function projectTasksReducer(draft, action) {}

export const AppContext = createContext();

function AppContextProvider(props) {
	const [userProjects, setUserProjects] = useState(["someProjId", "otherProjId"]);
	const [viewedProject, setViewedProject] = useState("someProjId");
	const [projectTabs, dispatchProjectTabs] = useImmerReducer(projectTabsReducer, {});
	const [projectTasks, dispatchProjectTasks] = useImmerReducer(projectTasksReducer, {});

	return (
		<AppContext.Provider
			value={{
				userProjects: userProjects,
				setUserProjects: setUserProjects,
				viewedProject: viewedProject,
				setViewedProject: setViewedProject,
				projectTabs: projectTabs,
				dispatchProjectTabs: dispatchProjectTabs,
				projectTasks: projectTasks,
				dispatchProjectTasks: dispatchProjectTasks,
			}}>
			{props.children}
		</AppContext.Provider>
	);
}

AppContextProvider.propTypes = {};

export default AppContextProvider;
