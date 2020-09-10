import React, { useState, useEffect } from "react";
import { AppContext } from "../ContextProviders/AppContextProvider";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { getUserProjects, getUserProject } from "../ServerProvider/projects";

import { setUserDispatch } from "../redux/rootReducer";

import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";
import style from "./Layout.module.css";

//TODO: what about cleanups for effects

function Layout() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.user);
	const setUser = (user) => dispatch(setUserDispatch(user));

	const [currentProject, setCurrentProject] = useState(null);
	const [loadedProjects, setLoadedProjects] = useState({}); // this needs to be project! (single)

	console.log("%c Layout render", "font-weight: bold; font-size: 10px; color: purple;");
	async function updateProjectsOnUserChange() {
		if (!user) return;
		try {
			const res = await getUserProjects(false);
			const projectsToLoad = {};
			res.data.forEach((proj) => {
				projectsToLoad[proj._id] = proj;
			});
			setLoadedProjects(res.data);
			console.log("req : ", res.data[0]);
			const currentProjRes = await getUserProject(res.data[0]._id);
			console.log("getting ", currentProjRes.data);
			setCurrentProject(currentProjRes.data);
			console.log("setCurrentProject(res.data[0]); ", res.data[0]);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		updateProjectsOnUserChange();
	}, [user]);

	useEffect(() => {
		if (loadedProjects[0]) {
			setCurrentProject(user.lastOpenedProject ? user.lastOpenedProject : loadedProjects[0]._id);
		}
	}, [loadedProjects]);

	return (
		<div>
			<div className={style["layout"]}>
				<div className={style["side-bar-wrapper"]}>
					<SideBar user={user} />
				</div>
				<div className={style["project-head"]}></div>
				<div className={style["project-side-bar"]}></div>
				<div className={style["project-wrapper"]}>
					{currentProject?._id && console.log("currentProject passed to proj ", currentProject)}
					{currentProject?._id ? <Project project={currentProject} /> : <div>SELECT PROJECT!</div>}
				</div>
			</div>
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
