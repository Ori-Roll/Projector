import React from "react";
import PropTypes from "prop-types";
import style from "./NumberCell.module.css";

function NumberCell({ cellData }) {
	return <div className={style["cell"]}>number: {cellData.content}</div>;
}

NumberCell.propTypes = {};

export default NumberCell;
