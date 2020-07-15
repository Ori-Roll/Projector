import React from "react";
import PropTypes from "prop-types";
import style from "./Spacer.module.css";

function TaskSpacer({ spacerWidth }) {
	return <div className={style["spacer"]} style={{ width: spacerWidth }} />;
}

TaskSpacer.propTypes = {};

export default TaskSpacer;

// {<div className={style["spacer-hover-area"]}></div>}
