import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../ContextProviders/AppContextProvider";
import PropTypes from "prop-types";

import { getUserProjects } from "../ServerProvider/projects";

import { setCrappyServerData, getCrappyServerData } from "../ServerProvider";

import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";
import style from "./Layout.module.css";

function Layout() {
	const { appInitState, setAppInitState } = useContext(AppContext);
	const { currentUser, setCurrentUser } = useContext(AppContext);
	const [loadedProjects, setLoadedProjects] = useState();

	const { viewedProject, setViewedProject } = useContext(AppContext);

	//TODO: what about cleanups for effects

	//	console.log("%c Layout render", "font-weight: bold; font-size: 20px; color: purple;");

	console.log("appInitState returned is : ", appInitState);

	async function updateProjectsOnUserChange() {
		console.log("updateProjectsOnUserChange : currentUser is ", currentUser);
		if (!currentUser) return;
		try {
			const res = await getUserProjects();
			setLoadedProjects(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		updateProjectsOnUserChange();
	}, [currentUser]);
	console.log("@Layout currentUser: ", currentUser);
	return (
		<div>
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
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
