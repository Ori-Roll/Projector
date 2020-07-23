import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { AppContext } from "./../../../../ContextProviders/AppContextProvider";

import TabArrow from "./TabArrow/TabArrow";
import style from "./TabHeader.module.css";

function TabHeader({ toggleTabIsOpen, tabIsOpen, tabItem }) {
	const { dispatchProjectData } = useContext(AppContext);

	useEffect(() => {
		/* console.log("%c TabHeader Mount!", "font-weight: bold; font-size: 15px; color: red;"); */
	}, []);

	const onHeaderClick = () => {
		toggleTabIsOpen();
	};

	function onAddTaskClick() {
		dispatchProjectData({ type: "ADD_NEW_TASK", tab: tabItem });
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
