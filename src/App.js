import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Project from "./Components/Project/Project";
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

	useEffect(() => {
		projects["someProjId"].tabs.push(NewTab(null, projects["someProjId"]));
		projects["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
		projects["otherProjId"].tabs.push(NewTab(null, projects["otherProjId"]));
	}, []);

	const [loadedProjects, setLoadedProjects] = useState(["someProjId", "otherProjId"]);

	return (
		<div className='app'>
			<header className='App-header'></header>
			{loadedProjects.map((project) => {
				console.log(projects);
				return (
					<button key={`${project}BTN`} onClick={() => setCurrentProject(project)}>
						{project}
					</button>
				);
			})}
			<Project data={projects[currentProject]} />
		</div>
	);
}

export default App;
