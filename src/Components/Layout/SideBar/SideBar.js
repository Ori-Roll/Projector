import React from "react";
import PropTypes from "prop-types";
import ProjectSelect from "./ProjectSelect/ProjectSelect";
import UserSelect from "./UserSelect/UserSelect";
import style from "./SideBar.module.css";

function SideBar({ viewedProject, setViewedProject, currentUser }) {
	return (
		<div className={style["side-bar"]}>
			<div className={style["general"]}>
				<div className={style["general-top"]} />
				<div className={style["general-mid"]}>
					<UserSelect />
				</div>
				<div className={style["general-bottom"]}></div>
			</div>
			<ProjectSelect viewedProject={viewedProject} setViewedProject={setViewedProject} />
		</div>
	);
}

SideBar.propTypes = {};

export default SideBar;
