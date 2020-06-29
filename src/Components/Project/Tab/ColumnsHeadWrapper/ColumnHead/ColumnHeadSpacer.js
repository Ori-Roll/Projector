import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./ColumnHead.module.css";
import defaults from "../../../../defaults";

function ColumnSpacerHeader({ column, changeTabData, columnIsDragged }) {
	function toggleMouseOver(mouseIsOver) {
		if (columnIsDragged) {
			changeTabData({
				newColumn: {
					id: column.id,
					spacer: mouseIsOver ? defaults.SPACER_WIDTH_ON_HOVER : defaults.SPACER_WIDTH,
				},
				type: "EDIT_COLUMN",
			});
		}
	}

	function onMouseUp() {}

	return (
		<div
			className={style["head-spacer-handle"]}
			onMouseOver={() => toggleMouseOver(true)}
			onMouseLeave={() => toggleMouseOver(false)}
			onMouseUp={() => onMouseUp()}
			style={{ width: column.spacer }}>
			{columnIsDragged ? <div className={style["head-spacer-hover-area"]}></div> : null}
		</div>
	);
}

ColumnSpacerHeader.propTypes = {};

export default ColumnSpacerHeader;

//&#x205E;
