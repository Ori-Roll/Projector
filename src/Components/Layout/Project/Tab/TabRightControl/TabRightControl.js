import React from "react";
import PropTypes from "prop-types";
import style from "./TabRightControl.module.css";

function TabRightControl({ changeTabData }) {
	function onClick() {
		changeTabData({
			columnType: "text",
			type: "ADD_NEW_EMPTY_COLUMN",
		});
	}

	return (
		<div className={style["tab-right-control"]} onClick={onClick}>
			<p>{"+"}</p>
		</div>
	);
}

TabRightControl.propTypes = {};

export default TabRightControl;
