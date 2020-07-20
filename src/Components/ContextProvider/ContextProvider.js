import React, { useState, createContext } from "react";

export const PageContext = createContext();

function ContextProvider(props) {
	const [projects, setProjects] = useState({});

	function addProject(proj) {
		setProjects((oldProjects) => {
			const newProjectsData = { ...oldProjects };
			newProjectsData[proj.id] = proj;
			return newProjectsData;
		});
	}

	return (
		<PageContext.Provider
			value={{
				projects: projects,
				addProject: addProject,
			}}>
			{props.children}
		</PageContext.Provider>
	);
}

ContextProvider.propTypes = {};

export default ContextProvider;
