import React from "react";
import PropTypes from "prop-types";

function ProjectSelect({ loadedProjects, currentProject, setCurrentProject }) {
	function onProjectClick(project) {
		setCurrentProject(project);
	}
	return (
		<div>
			{loadedProjects.map((project) => {
				return (
					<button key={`${project}BTN`} onClick={() => onProjectClick(project)}>
						{project}
						{console.log("object")}
					</button>
				);
			})}
		</div>
	);
}

ProjectSelect.propTypes = {};

export default ProjectSelect;
