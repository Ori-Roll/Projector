import React from "react";
import PropTypes from "prop-types";
import style from "./Spacer.module.css";

function TaskSpacer({ column }) {
	return (
		<div className={style["spacer"]} style={{ width: column.spacer }}>
			{<div className={style["spacer-hover-area"]}></div>}
		</div>
	);
}

TaskSpacer.propTypes = {};

export default TaskSpacer;
