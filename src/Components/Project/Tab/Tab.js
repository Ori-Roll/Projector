import React, { useState } from "react";
import PropTypes from "prop-types";

import defaults from "../../defaults/";

import Task from "./Task/Task";
import ColumnsHead from "./ColumnsHead/ColumnsHead";
import TabHeader from "./TabHeader/TabHeader";
import TabArrow from "./TabArrow/TabArrow";

import style from "./Tab.module.css"; // TODO: rename file to lowercase, in my projects it's always style(s).module.css

function Tab() {
	// TODO: I would rename this
	const [tabIsOpen, setTabIsOpen] = useState(true); // this needs to initially come from backend

	function toggleTabIsOpen() {
		setTabIsOpen(!tabIsOpen);
	}
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

	const [tabData, setTabData] = useState({
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
	});

	// TODO: choose drag and drop package, consider this: https://github.com/atlassian/react-beautiful-dnd
	return (
		<div className={style.tab}>
			<div className={style["tab-side-holder"]}>
				{" "}
				{/* change holder to wrapper, consider removing this */}
				<TabArrow tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
			</div>
			<div className={style["tab-header-holder"]}>
				<TabHeader tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
			</div>

			<div /* TODO add classcat package:  */
				/* className={cc([style["tab-content-holder"], {[style.open]: tabIsOpen}])} */ className={
					style["tab-content-holder"]
				} /* TODO add classcat package:  */
				style={!tabIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
				{" "}
				{/* TODO use class open */}
				<ColumnsHead columns={tabData.columns} setTabData={setTabData} />
				{tabData.tasks.map((task) => {
					return (
						<Task key={task.key} task={task} columns={tabData.columns} setTabData={setTabData} />
					);
				})}
			</div>
		</div>
	);
}

Tab.propTypes = {};

export default Tab;
