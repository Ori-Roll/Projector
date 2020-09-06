import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../ContextProviders/AppContextProvider";
import PropTypes from "prop-types";

import { getUserProjects } from "../ServerProvider/projects";

import { setCrappyServerData, getCrappyServerData } from "../ServerProvider";

import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";
import style from "./Layout.module.css";

//TODO: what about cleanups for effects

function Layout() {
	const { viewedProject, setViewedProject } = useContext(AppContext);
	const { currentUser, setCurrentUser } = useContext(AppContext);
	const [currentProject, setCurrentProject] = useState(null);
	const [loadedProjects, setLoadedProjects] = useState({});

	console.log("%c Layout render", "font-weight: bold; font-size: 10px; color: purple;");

	async function updateProjectsOnUserChange() {
		if (!currentUser) return;
		try {
			const res = await getUserProjects();
			setLoadedProjects(res.data);
			const projectsToLoad = {};
			res.data.forEach((proj) => {
				projectsToLoad[proj._id] = proj;
			});
			setLoadedProjects({ ...projectsToLoad });
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		updateProjectsOnUserChange();
	}, [currentUser]);

	useEffect(() => {
		if (loadedProjects[0]) {
			setCurrentProject(
				currentUser.lastOpenedProject ? currentUser.lastOpenedProject : loadedProjects[2]._id
			);
		}
	}, [loadedProjects]);

	return (
		<div>
			<div className={style["layout"]}>
				<div className={style["side-bar-wrapper"]}>
					<SideBar currentUser={currentUser} />
				</div>
				<div className={style["project-head"]}></div>
				<div className={style["project-side-bar"]}></div>
				<div className={style["project-wrapper"]}>
					{currentProject ? (
						<Project project={loadedProjects[currentProject]} />
					) : (
						<div>SELECT PROJECT!</div>
					)}
				</div>
			</div>
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
