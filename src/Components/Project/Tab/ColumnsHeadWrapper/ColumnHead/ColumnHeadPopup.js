import React from "react";
import PropTypes from "prop-types";
import style from "./ColumnHead.module.css";

function ColumnHeadPopup({ hovered, draggedColumn, column, onMouseDown }) {
	return (
		<div
			className={style["column-head-popup"]}
			style={hovered && !draggedColumn ? { top: "-13px" } : { opacity: "0" }}>
			{column.isDraggable ? (
				<div
					onMouseDown={() => onMouseDown()}
					className={style["column-head-drag-handle"]}
					style={hovered && !draggedColumn ? { opacity: "100%" } : { visibility: "none" }}>
					{"<>"}
				</div>
			) : null}
			<div className={style["column-head-setup-btn"]}>&#9881;</div>
		</div>
	);
}

ColumnHeadPopup.propTypes = {};

export default ColumnHeadPopup;