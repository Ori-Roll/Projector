import React, { useState } from "react";
import PropTypes from "prop-types";
import defaults from "../defaults";
import Tab from "./Tab/Tab";

import style from "./Project.module.css"; // TODO: change from style to: import classes from '..';

function Project(props) {
	/* 
	function newColumn(type){
		
		// type check (string and of known types)
		// maybe there will be a function that checks that the type exist on types of cells+ types of coumns+ext...
		
		const key = "2",
		const type = "number",
		const width = defaults.WIDTH_OF_COLUMN[type],
		const dataId = "002",
		const spacer = defaults.SPACER_WIDTH,
		const color = "#8b51bd",
	} */

	const [projectData, setProjectData] = useState([
		{
			id: "abc_123",
			name: "Project A",
			columns: [
				{
					key: /* newColumnKey() */ "1",
					type: "text",
					width: 150, // TODO: what defines min-width
					dataId: /* newColumnDataId("text"), */ "001",
					spacer: defaults.SPACER_WIDTH, // TODO: don't think you need this
					// TODO: assume all/some columns will have "settings" prop
				},
				{
					key: "2",
					type: "number",
					width: 300,
					dataId: "002",
					spacer: defaults.SPACER_WIDTH,
					color: "#8b51bd",
				},
				{
					// TODO: id: 'alfjhasl234234',
					key: "3", // TODO: no need
					type: "stars",
					width: 300,
					dataId: "003", // TODO: no need
					spacer: defaults.SPACER_WIDTH,
					color: "rgb(64, 109, 255)",
				},
			],
			tasks: [
				{
					key: "a", // is key id? I would consider changing this to id
					"001": { content: "text for a001" },
					"002": { content: "text for a002" },
					"003": { content: 3 },
					// "alfjhasl234234 (column id)": { content: 3 },
				},
				{
					key: "b",
					"001": { content: "text for b001" },
					"002": { content: "text for b002" },
					"003": { content: 3 },
				},
			],
		},
	]);

	return (
		<div className={style.project}>
			{projectData.map((tab) => (
				<Tab key={tab.id} tab={tab} setProjectData={setProjectData} />
			))}
		</div>
	);
}

Project.propTypes = {};

export default Project;
