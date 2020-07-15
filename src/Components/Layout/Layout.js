import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";
import { NewTab } from "../misc/NewDataMakers";
import style from "./Layout.module.css";

const projects = {
	someProjId: {
		id: "someProjId",
		name: "someProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: [],
	},
	otherProjId: {
		id: "otherProjId",
		name: "someProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: [],
	},
};

function Layout(props) {
	const [currentProject, setCurrentProject] = useState("someProjId");
	const [loadedProjects, setLoadedProjects] = useState(["someProjId", "otherProjId"]);

	useEffect(() => {
		projects["someProjId"].tabs.push(NewTab(null, projects["someProjId"]));
		projects["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
		projects["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
	}, []);

	return (
		<div className={style["layout"]}>
			<div className={style["side-bar-wrapper"]}>
				<SideBar
					loadedProjects={loadedProjects}
					currentProject={currentProject}
					setCurrentProject={setCurrentProject}
				/>
			</div>
			<div className={style["project-wrapper"]}>
				{projects[currentProject] ? <Project projectItem={projects[currentProject]} /> : null}
			</div>
		</div>
	);
}

Layout.propTypes = {};

export default Layout;
