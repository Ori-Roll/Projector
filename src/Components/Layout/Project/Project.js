import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import defaults from "../../defaults";
import Tab from "./Tab/Tab";
import ProjectLoader from "./ProjectLoader";

import { NewTab } from "../../misc/NewDataMakers";

import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';

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

async function getCrappyServerData(query) {
	await someTime();
	if (false) {
		if (Math.random() > 0.7) {
			return "error";
		}
	}
	return crappyServerData[query];
}

/* a------
    b-------- go back to b and this time weit for b to finish
	   c--X	 
 - what if person 1 delete a column while person 2 changes colomns data	 
 - is there a way of saving changes and revert without saving everything ?

*/

crappyServerData["someProjId"].tabs.push(NewTab(null, crappyServerData["someProjId"]));
crappyServerData["otherProjId"].tabs.push(NewTab(null, crappyServerData["otherProjId"]));
crappyServerData["otherProjId"].tabs.push(NewTab(null, crappyServerData["otherProjId"]));

function Project({ currentProject }) {
	const [projectData, setProjectData] = useState(null);
	const [loading, setLoading] = useState(true);

	console.log("currentProject", currentProject);

	useEffect(() => {
		console.log(
			`%c PROJECT MOUNT ${projectData} (effect)`,
			"color: red;font-weight: bold; font-size: 15px;"
		);
	}, []);

	useEffect(() => {
		getCrappyServerData(currentProject)
			.then((res) => {
				console.log("res", res);
				setProjectData(res);
			})
			.then(setLoading(false));
	}, [currentProject]);

	/* console.log(`%c PROJECT RENDER ${projectData.name}`, "color: blue"); */

	return (
		<>
			{!projectData ? (
				<ProjectLoader />
			) : (
				<div className={style.project}>
					{projectData.tabs.map((tabItem) => {
						return <Tab key={tabItem.id} tabItem={tabItem} projectTasks={projectData.tasks} />;
					})}
				</div>
			)}
		</>
	);
}

Project.propTypes = {};

export default Project;

/*
tabs: [
		{
		id: makeKey(),
		name: "Tab A",
		columns: [
			{
				id: "001",
				type: "text",
				name: "SomeText001",
				width: 150, // TODO: what defines min-width
				spacer: defaults.SPACER_WIDTH,
				color: "#9b51bd",
				isDragged: false,
				preferences: {},
				// TODO: assume all/some columns will have "settings" prop
			},
			{
				id: "002",
				type: "number",
				name: "THIS number",
				width: 190,
				spacer: defaults.SPACER_WIDTH,
				color: "#8b51bd",
				isDragged: false,
				preferences: {},
			},
			{
				// TODO: id: 'alfjhasl234234',
				id: "003", // TODO: no need
				type: "stars",
				name: "stars raiting 3",
				width: 300,
				spacer: defaults.SPACER_WIDTH,
				color: "rgb(64, 109, 255)",
				isDragged: false,
				preferences: {},
			},
			{
				id: "004", // TODO: no need
				type: "status",
				name: "status 004",
				width: 100,
				spacer: defaults.SPACER_WIDTH,
				color: "rgb(164, 109, 255)",
				isDragged: false,
				preferences: {
					selectables: {
						done: { color: "green", text: "DONE" },
						working: { color: "yellow", text: "WORKING" },
					},
				},
			},
		],
		tasksQuerie: ["a", "b", "empty", "last"],
	}, 
],
tasks: [
	 {
		id: "a",
		isMock: false,
		"001": { id: "001", content: "text for a001" },
		"002": { id: "002", content: "text for a002" },
		"003": { id: "003", content: 3 },
		"004": { id: "004", content: "done" },
		dateCreated: new Date(),
		// "alfjhasl234234 (column id)": { content: 3 },
	},
	{
		id: "b",
		isMock: false,
		"001": { id: "001", content: "text for b001" },
		"002": { id: "002", content: "text for b002" },
		"003": { id: "003", content: 3 },
		dateCreated: new Date(),
	},
	{
		id: "empty",
		isMock: false,
		dateCreated: new Date(),
	},
	{
		id: "last",
		isMock: true,
		dateCreated: new Date(),
	}, 
],
});*/
