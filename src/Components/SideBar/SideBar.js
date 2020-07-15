import React from "react";
import PropTypes from "prop-types";
import ProjectSelect from "./ProjectSelect/ProjectSelect";

function SideBar({ loadedProjects, currentProject, setCurrentProject }) {
	return (
		<div>
			<ProjectSelect
				loadedProjects={loadedProjects}
				currentProject={currentProject}
				setCurrentProject={setCurrentProject}
			/>
		</div>
	);
}

SideBar.propTypes = {};

export default SideBar;
