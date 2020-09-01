import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../ContextProviders/AppContextProvider";
import PropTypes from "prop-types";

import { setCrappyServerData, getCrappyServerData } from "../ServerProvider";

import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";

import style from "./Layout.module.css";

function Layout(props) {
	const [loadedProjects, setLoadedProjects] = useState(["someProjId", "otherProjId"]);
	const { currentUser, setCurrentUser } = useContext(AppContext);
	const { viewedProject, setViewedProject } = useContext(AppContext);

	//TODO: what about cleanups for effects

	//	console.log("%c Layout render", "font-weight: bold; font-size: 20px; color: purple;");

	return (
		<div className={style["layout"]}>
			<div className={style["side-bar-wrapper"]}>
				<SideBar
					viewedProject={viewedProject}
					setViewedProject={setViewedProject}
					currentUser={currentUser}
				/>
			</div>
			<div className={style["project-head"]}></div>
			<div className={style["project-side-bar"]}></div>
			<div className={style["project-wrapper"]}>
				{viewedProject ? <Project viewedProject={viewedProject} /> : <div>SELECT PROJECT!</div>}
			</div>
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
