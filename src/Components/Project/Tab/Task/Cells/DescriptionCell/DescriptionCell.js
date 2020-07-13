import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { NEW_COLUMN_DATA } from "../../../../../defaults";

import style from "./DescriptionCell.module.css";

function DescriptionCell({
	cellData = { id: Math.random(), content: NEW_COLUMN_DATA["description"].newCellContent }, //TODO: remove Math-random!!!
	task,
	doCellContentChange,
}) {
	const [cellText, setCellText] = useState(cellData.content);

	useEffect(() => {
		/* dispatchChange(); */
	}, [cellText]);

	function onInputChange(e) {
		setCellText(e.target.value);
	}

	/* function dispatchChange() {
		if (!cellText) return;
		let editedTask = { ...task };
		editedTask[cellData.id].content = cellText;
		changeTabData({ editedTask: editedTask, type: "EDIT_TASK" });
	}
 */
	return (
		<input
			className={style["description-cell-wrapper"]}
			value={cellText}
			onChange={(e) => onInputChange(e)}
			/* onBlur={() => dispatchChange()} */
		/>
	);
}

DescriptionCell.propTypes = {};

export default DescriptionCell;
