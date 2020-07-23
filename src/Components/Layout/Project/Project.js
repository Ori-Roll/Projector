import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { AppContext } from "./../../ContextProviders/AppContextProvider";
import defaults from "../../defaults";
import Tab from "./Tab/Tab";
import ProjectLoader from "./ProjectLoader";

import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';

import { setCrappyServerData, getCrappyServerData } from "./../../ServerProvider";

function Project({ viewedProject }) {
	const { projectData, dispatchProjectData } = useContext(AppContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(
			`%c PROJECT MOUNT ${projectData} (effect)`,
			"color: red;font-weight: bold; font-size: 15px;"
		);
	}, []);

	useEffect(() => {
		getCrappyServerData(viewedProject)
			.then((res) => {
				dispatchProjectData({ type: "CHANGE_PROJECT_TO", project: res });
			})
			.then(setLoading(false));
	}, [viewedProject]);

	return (
		<>
			{!projectData ? (
				<ProjectLoader />
			) : (
				<div className={style.project}>
					{console.log("projectData-Sent", projectData)}
					{projectData.tabs.map((tabItem) => {
						let tabTaskSet = tabItem.tasksQuerie.map((querie) => projectData.tasks[querie]);
						return <Tab key={tabItem.id} tabItem={tabItem} tabTasks={tabTaskSet} />;
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
