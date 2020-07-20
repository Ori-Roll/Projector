import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Project from "./Project/Project";
import SideBar from "./SideBar/SideBar";
import { NewTab } from "../misc/NewDataMakers";
import style from "./Layout.module.css";

const crappyServerData = {
	someProjId: {
		id: "someProjId",
		name: "some ProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: {},
	},
	otherProjId: {
		id: "otherProjId",
		name: "other ProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [],
		tasks: {},
	},
};

function someTime() {
	return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function setCrappyServerData(data) {
	await someTime();
	if (false) {
		if (Math.random() > 0.7) {
			return "error";
		}
	}
	crappyServerData = data;
	return getCrappyServerData; // TODO: check for timeStamps mach
}

async function getCrappyServerData() {
	await someTime();
	if (false) {
		if (Math.random() > 0.7) {
			return "error";
		}
	}
	return crappyServerData;
}

const projects = {};

serverData["someProjId"].tabs.push(NewTab(null, projects["someProjId"]));
serverData["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
serverData["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));

function Layout(props) {
	const [currentProject, setCurrentProject] = useState("someProjId");
	const [loadedProjects, setLoadedProjects] = useState(["someProjId", "otherProjId"]);
	const [currentUser, setCurrentUser] = useState("User3 name");

	return (
		<div className={style["layout"]}>
			<div className={style["side-bar-wrapper"]}>
				<SideBar
					loadedProjects={loadedProjects}
					currentProject={currentProject}
					setCurrentProject={setCurrentProject}
					currentUser={currentUser}
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
