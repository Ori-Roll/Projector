import React from "react";
import PropTypes from "prop-types";
import style from "./StatusCell.module.css";

function StatusCell({ cellData = { status: "done" }, column }) {
	const status = {
		working: <div className={style["status-cell"]}>WORKING</div>,
		done: <div className={style["status-cell"]}>DONE</div>,
	};
	console.log(cellData);
	return status[cellData.status];
}

StatusCell.propTypes = {};

export default StatusCell;
