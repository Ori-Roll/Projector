import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./Tab.module.css";
import defaults from "../../defaults/";
import Task from "./Task/Task";
import TabHead from "./TabHead/TabHead";

function Tab() {
	const [tabData, setTabData] = useState({
		columns: [
			{
				key: "1",
				type: "text",
				width: 150,
				dataId: "001",
				spacer: defaults.SPACER_WIDTH,
			},
			{
				key: "2",
				type: "number",
				width: 300,
				dataId: "002",
				spacer: defaults.SPACER_WIDTH,
			},
		],
		tasks: [
			{
				key: "a",
				"001": { data: "a001" },
				"002": { data: "a002" },
			},
			{
				key: "b",
				"001": { data: "b001" },
				"002": { data: "b002" },
			},
		],
	});

	return (
		<div className={style.tab}>
			<>
				<TabHead columns={tabData.columns} />
			</>
			<>
				{tabData.tasks.map((task) => {
					return <Task key={task.key} task={task} columns={tabData.columns} />;
				})}
			</>
		</div>
	);
}

Tab.propTypes = {};

export default Tab;
