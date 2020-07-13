import React from "react";
import PropTypes from "prop-types";
import style from "./NumberCell.module.css";

function NumberCell({ id, content, doCellContentChange }) {
	return <div className={style["cell"]}>{content}</div>;
}

NumberCell.propTypes = {};

export default NumberCell;
