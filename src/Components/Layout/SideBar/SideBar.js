import React from "react";
import PropTypes from "prop-types";
import ProjectSelect from "./ProjectSelect/ProjectSelect";
import UserSelect from "./UserSelect/UserSelect";
import style from "./SideBar.module.css";

function SideBar({ loadedProjects, currentProject, setCurrentProject, currentUser }) {
	console.log(currentProject);
	return (
		<div className={style["side-bar"]}>
			<div className={style["general"]}>
				<div className={style["general-top"]} />
				<div className={style["general-mid"]} />
				<div className={style["general-bottom"]}>
					<UserSelect currentUser={currentUser} />
				</div>
			</div>
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
