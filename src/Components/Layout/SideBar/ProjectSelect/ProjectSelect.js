import React from "react";
import PropTypes from "prop-types";
import style from "./ProjectSelect.module.css";

function ProjectSelect({ loadedProjects, currentProject, setCurrentProject }) {
	function onProjectClick(project) {
		setCurrentProject(project);
	}
	return (
		<div className={style["project-select"]}>
			{loadedProjects.map((project) => {
				return (
					<button
						className={style["project-select-btn"]}
						key={`${project}BTN`}
						onClick={() => onProjectClick(project)}>
						{project}
					</button>
				);
			})}
		</div>
	);
}

ProjectSelect.propTypes = {};

export default ProjectSelect;
