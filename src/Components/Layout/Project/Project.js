import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import _, { forEach } from "lodash";

import { AppContext } from "./../../ContextProviders/AppContextProvider";
import defaults from "../../defaults";
/* import Group from "./Group/GroupCopy1"; */
import Group from "./Group/Group";
import ProjectLoader from "./ProjectLoader";

import { getProjectGroups } from "../../ServerProvider/groups";

import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';

import { setCrappyServerData, getCrappyServerData } from "./../../ServerProvider";

function Project({ project }) {
	/* const { projectData, dispatchProjectData } = useContext(AppContext); */
	const [projectData, setProjectData] = useState({ ...project });
	const [loading, setLoading] = useState(true);

	async function initGroups() {
		console.log("INIT");
		try {
			const groups = await getProjectGroups(project._id);
			console.log("groups are ", groups.data);
			const newGroups = {};
			groups.data.forEach((group) => {
				newGroups[group._id] = group;
				newGroups[group._id].loaded = true;
			});
			setProjectData((oldData) => {
				const newData = { ...oldData, groups: newGroups };
				return newData;
			});
		} catch (error) {
			console.error(error);
		}
	}

	console.log("%c Project render", "font-weight: bold; font-size: 18px; color: purple;");
	useEffect(() => {
		console.log(
			`%c PROJECT MOUNT ${project} (effect)`,
			"color: red;font-weight: bold; font-size: 15px;"
		);
		initGroups();
	}, []);

	return (
		<>
			{!projectData.groups ? (
				<ProjectLoader />
			) : (
				<div className={style.project}>
					{Object.values(projectData.groups).map((group) => {
						/* let groupTaskSet = groupItem.tasksQuerie.map((querie) => project.tasks[querie]); */
						/* return <Group key={groupItem.id} groupItem={groupItem} groupTasks={groupTaskSet} />; */
						return <Group key={group._id} group={group} />;
					})}
				</div>
			)}
		</>
	);
}

Project.propTypes = {};

export default Project;

/*
groups: [
		{
		id: makeKey(),
		name: "Group A",
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
