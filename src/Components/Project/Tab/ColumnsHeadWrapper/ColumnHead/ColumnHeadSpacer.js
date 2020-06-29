import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./ColumnHead.module.css";
import defaults from "../../../../defaults";

function ColumnHeadSpacer({ column, changeTabData, draggedColumn }) {
	function toggleMouseOver(mouseIsOver) {
		if (draggedColumn) {
			changeTabData({
				newColumn: {
					id: column.id,
					spacer: mouseIsOver ? defaults.SPACER_WIDTH_ON_HOVER : defaults.SPACER_WIDTH,
				},
				type: "EDIT_COLUMN",
			});
		}
	}

	function onMouseUp() {
		// move draggedColumn after column
		console.log("mouseUp");
		changeTabData({
			column: draggedColumn,
			moveAfter: column,
			type: "MOVE_COLUMN_AFTER",
		});
	}

	return (
		<div
			className={style["head-spacer-handle"]}
			onMouseOver={() => toggleMouseOver(true)}
			onMouseLeave={() => toggleMouseOver(false)}
			onMouseUp={() => onMouseUp()}
			style={{ width: column.spacer }}>
			{draggedColumn ? <div className={style["head-spacer-hover-area"]}></div> : null}
		</div>
	);
}

ColumnHeadSpacer.propTypes = {};

export default ColumnHeadSpacer;

//&#x205E;
