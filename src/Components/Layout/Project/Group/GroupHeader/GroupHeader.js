import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { AppContext } from "../../../../ContextProviders/AppContextProvider";

import GroupArrow from "./GroupArrow/GroupArrow";
import style from "./GroupHeader.module.css";

function GroupHeader({ groupIsOpen, setGroupIsOpen, group }) {
	const { dispatchProjectData } = useContext(AppContext);

	useEffect(() => {
		/* console.log("%c GroupHeader Mount!", "font-weight: bold; font-size: 15px; color: red;"); */
	}, []);

	const onHeaderClick = () => {
		setGroupIsOpen(!groupIsOpen);
	};

	function onAddTaskClick() {
		/* dispatchProjectData({ type: "ADD_NEW_TASK", group: group }); */
	}

	return (
		<div className={style["group-header-wrapper"]}>
			<GroupArrow groupIsOpen={groupIsOpen} setGroupIsOpen={setGroupIsOpen} />
			<div
				className={style["group-header"]}
				style={{ fontWeight: groupIsOpen ? "600" : "400" }}
				onClick={onHeaderClick}>
				This is a header
			</div>
			<div className={style["group-header-right-menu"]} onClick={onAddTaskClick}></div>
		</div>
	);
}

GroupHeader.propTypes = {};

export default GroupHeader;
