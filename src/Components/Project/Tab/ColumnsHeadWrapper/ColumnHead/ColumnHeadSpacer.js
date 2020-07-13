import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./ColumnHead.module.css";
import defaults from "../../../../defaults";
import { indexOf } from "lodash";

function ColumnHeadSpacer({ column, tabData, changeTabData, draggedColumn, setResizedColumn }) {
	const [mouseOver, setMouseOver] = useState(false);

	function toggleMouseOver(mouseIsOver) {
		if (draggedColumn && mouseIsOver) {
			if (draggedColumn.id === column.id) return;
			setMouseOver(true);
			changeTabData({
				editedColumn: {
					id: column.id,
					spacer: `${draggedColumn.width}px`,
				},
				type: "EDIT_COLUMN",
			});
		} else if (!draggedColumn || !mouseIsOver) {
			setMouseOver(false);
			changeTabData({
				editedColumn: {
					id: column.id,
					spacer: defaults.SPACER_WIDTH,
				},
				type: "EDIT_COLUMN",
			});
		}
	}

	function onMouseUp() {
		// move draggedColumn after column
		if (draggedColumn) {
			changeTabData({
				column: draggedColumn,
				moveAfter: column,
				type: "MOVE_COLUMN_AFTER",
			});
		}
	}

	/* function onMouseDown() {
		console.log(column);
	} */

	function onStartResize() {
		setResizedColumn(column);
	}
	function onStopResize() {
		setResizedColumn(null);
	}

	function isValidHoverSpacer() {
		if (
			tabData.columns.indexOf(column) !==
			tabData.columns.findIndex((item) => {
				return item.id === draggedColumn.id;
			}) -
				1
		) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div
			className={style["head-spacer-handle"]}
			style={{
				width: column.spacer,
				border: mouseOver && draggedColumn ? "#e85454 2px dashed" : null,
			}}>
			{draggedColumn && isValidHoverSpacer() ? (
				<div
					className={style["head-spacer-hover-area"]}
					onMouseOver={() => toggleMouseOver(true)}
					onMouseLeave={() => toggleMouseOver(false)}
					onMouseUp={onMouseUp}></div>
			) : (
				<div
					className={style["head-spacer-hover-resize-area"]}
					onMouseDown={onStartResize}
					onMouseUp={onStopResize}></div>
			)}
		</div>
	);
}

ColumnHeadSpacer.propTypes = {};

export default ColumnHeadSpacer;

//&#x205E;
