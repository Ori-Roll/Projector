import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Project from "./Components/Project/Project";
import SideBar from "./Components/SideBar/SideBar";

import "./App.css";
import { NewTab } from "./Components/misc/NewDataMakers";

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

function App() {
	const [currentProject, setCurrentProject] = useState("someProjId");
	const [loadedProjects, setLoadedProjects] = useState(["someProjId", "otherProjId"]);

	useEffect(() => {
		projects["someProjId"].tabs.push(NewTab(null, projects["someProjId"]));
		projects["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
		projects["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
	}, []);

	return (
		<div className='app'>
			<header className='App-header'></header>
			<SideBar
				loadedProjects={loadedProjects}
				currentProject={currentProject}
				setCurrentProject={setCurrentProject}
			/>

			<div style={{ backgroundColor: "blue" }}>
				{projects[currentProject] ? <Project projectItem={projects[currentProject]} /> : null}
			</div>
		</div>
	);
}

export default App;
