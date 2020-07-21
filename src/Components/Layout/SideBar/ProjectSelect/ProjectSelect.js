import React, { useContext } from "react";
import PropTypes from "prop-types";
import style from "./ProjectSelect.module.css";
import { AppContext } from "../../../ContextProviders/AppContextProvider";

function ProjectSelect({ viewedProject, setViewedProject }) {
	const { userProjects } = useContext(AppContext);

	function onProjectClick(project) {
		setViewedProject(project);
	}
	return (
		<div className={style["project-select"]}>
			<div className={style["current-project-display"]}>{viewedProject}</div>
			{userProjects.map((project) => {
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
