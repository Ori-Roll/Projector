import React, { useEffect } from "react";
import PropTypes from "prop-types";

import TabArrow from "./TabArrow/TabArrow";
import style from "./TabHeader.module.css";

function TabHeader({ toggleTabIsOpen, tabIsOpen, changeTabData }) {
	useEffect(() => {
		console.log("%c TabHeader Mount!", "font-weight: bold; font-size: 15px; color: red;");
	}, []);

	const onHeaderClick = () => {
		toggleTabIsOpen();
	};

	function onAddTaskClick() {
		changeTabData({ type: "ADD_NEW_TASK" });
	}

	return (
		<div className={style["tab-header-wrapper"]}>
			<TabArrow tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
			<div
				className={style["tab-header"]}
				style={{ fontWeight: tabIsOpen ? "600" : "400" }}
				onClick={onHeaderClick}>
				This is a header
			</div>
			<div className={style["tab-header-right-menu"]} onClick={onAddTaskClick}></div>
		</div>
	);
}

TabHeader.propTypes = {};

export default TabHeader;
