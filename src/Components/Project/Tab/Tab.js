import React, { useState } from "react";
import PropTypes from "prop-types";

import style from "./Tab.module.css";
import defaults from "../../defaults/";

import Task from "./Task/Task";
import ColumnsHead from "./ColumnsHead/ColumnsHead";
import TabHeader from "./TabHeader/TabHeader";
import TabArrow from "./TabArrow/TabArrow";

function Tab() {
	const [tabIsOpen, setTabIsOpen] = useState(false); // this needs to initially come from backend

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
			<div className={style["tab-side-holder"]}>
				<TabArrow tabIsOpen={tabIsOpen} setTabIsOpen={setTabIsOpen} />
			</div>
			<div className={style["tab-header-holder"]}>
				<TabHeader />
			</div>

			<div
				className={style["tab-content-holder"]}
				style={!tabIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
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
