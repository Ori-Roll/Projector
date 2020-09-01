import React from "react";
import PropTypes from "prop-types";
import style from "./GroupRightControl.module.css";

function GroupRightControl({ changeGroupData }) {
	function onClick() {
		changeGroupData({
			columnType: "text",
			type: "ADD_NEW_EMPTY_COLUMN",
		});
	}

	return (
		<div className={style["group-right-control"]} onClick={onClick}>
			<p>{"+"}</p>
		</div>
	);
}

GroupRightControl.propTypes = {};

export default GroupRightControl;
