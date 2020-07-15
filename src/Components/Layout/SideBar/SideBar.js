import React from "react";
import PropTypes from "prop-types";
import ProjectSelect from "./ProjectSelect/ProjectSelect";
import style from "./SideBar.module.css";

function SideBar({ loadedProjects, currentProject, setCurrentProject }) {
	return (
		<div className={style["side-bar"]}>
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
