import React from "react";
import PropTypes from "prop-types";
import ProjectSelect from "./ProjectSelect/ProjectSelect";

import UserSelect from "./UserSelect/UserSelect";
import style from "./SideBar.module.css";

function SideBar({ viewedProject, setViewedProject, user }) {
	return (
		<div className={style["side-bar"]}>
			<ProjectSelect />
			<div className={style["general"]}>
				<UserSelect />
			</div>
		</div>
	);
}

SideBar.propTypes = {};

export default SideBar;
