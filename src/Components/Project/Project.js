import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import defaults from "../defaults";
import { makeKey } from "../misc";
import Tab from "./Tab/Tab";
import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';
import { forEach } from "lodash";

function Project(props) {
	/* 
	function newColumn(type){
		
		// type check (string and of known types)
		// maybe there will be a function that checks that the type exist on types of cells+ types of coumns+ext...
		
        const id = "002",
		const type = "number",
		const width = defaults.WIDTH_OF_COLUMN[type],
		const spacer = defaults.SPACER_WIDTH,
		const color = "#8b51bd",
	} */

	const [projectData, setProjectData] = useState({
		id: "someProjId",
		name: "someProjName",
		users: [
			{ id: "user1Id", permission: "viewer" }, // can only view things
			{ id: "user2Is", permission: "user" }, // can change and add things
			{ id: "user3Id", permission: "boss" }, // at least one has to be boss, can change settings and delete project
			//users have a list of projects too, need valedations from projects when getting projects
		],
		tabs: [
			{
				id: makeKey(),
				name: "Project A",
				columns: [
					{
						id: "001",
						type: "text",
						width: 150, // TODO: what defines min-width
						spacer: defaults.SPACER_WIDTH,
						// TODO: assume all/some columns will have "settings" prop
					},
					{
						id: "002",
						type: "number",
						width: 300,
						spacer: defaults.SPACER_WIDTH,
						color: "#8b51bd",
					},
					{
						// TODO: id: 'alfjhasl234234',
						id: "003", // TODO: no need
						type: "stars",
						width: 300,
						spacer: defaults.SPACER_WIDTH,
						color: "rgb(64, 109, 255)",
					},
				],
				tasksQuerie: ["a", "b", "empty"],
			},
		],
		tasks: [
			{
				id: "a",
				"001": { content: "text for a001" },
				"002": { content: "text for a002" },
				"003": { content: 3 },
				dateCreated: new Date(),
				// "alfjhasl234234 (column id)": { content: 3 },
			},
			{
				id: "b",
				"001": { content: "text for b001" },
				"002": { content: "text for b002" },
				"003": { content: 3 },
				dateCreated: new Date(),
			},
			{
				id: "empty",
				dateCreated: new Date(),
			},
		],
	});

	function taskOfIdInList(id, listOfTasks) {
		// correct this mess
		let index = listOfTasks.findIndex((task) => {
			// bad "t" in original find in reducer
			return task.id === id;
		});
		if (index === -1) {
			throw new Error("No matching task");
		}
		return index;
	}
	return (
		<div className={style.project}>
			{projectData.tabs.map((tabItem) => {
				//!!!!!!!!!!!!DO I DO THISSSSSS ???????
				let tasks = [];
				tabItem.tasksQuerie.forEach((querie) =>
					tasks.push(projectData.tasks[taskOfIdInList(querie, projectData.tasks)])
				);
				tabItem.tasks = tasks;
				return (
					<Tab
						key={tabItem.id}
						tabItem={tabItem}
						setProjectData={setProjectData}
						projectData={projectData}
					/>
				);
			})}
		</div>
	);
}

Project.propTypes = {};

export default Project;
