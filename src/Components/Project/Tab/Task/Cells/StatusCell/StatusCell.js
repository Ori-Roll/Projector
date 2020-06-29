import React from "react";
import PropTypes from "prop-types";
import style from "./StatusCell.module.css";

function StatusCell({ cellData = { content: "done" }, column = {} }) {
	console.log(column);

	console.log(cellData);
	return <div></div>;
}

StatusCell.propTypes = {};

export default StatusCell;
