import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import style from "./TextCell.module.css";
import { NEW_COLUMN_DATA } from "../../../../../defaults";

function TextCell({ id, content, doCellContentChange }) {
	const [cellText, setCellText] = useState(content);

	console.log(`%c ------cell render! content: ${content}---------`, "color: blue");
	useEffect(() => console.log("%c TextCell MOUNT!", "color:red"), []);

	function onInputChange(text) {
		setCellText(text);
		doCellContentChange(id, text, true);
	}

	function onBlur() {
		doCellContentChange(id, cellText, false);
	}

	return (
		<div>
			<input
				className={style["cell"]}
				value={cellText}
				onChange={(e) => onInputChange(e.target.value)}
				onBlur={() => onBlur()}
			/>
		</div>
	);
}

TextCell.propTypes = {};

/* export default TextCell; */

export default React.memo(TextCell, (prevProps, nextProps) => {
	if (prevProps.content === "" && nextProps.content === "") return true;
	return prevProps.content !== nextProps.content ? true : false;
});

/* let changeCellData;

function CellDataChanger(task, cellId, changeTabData) {
	console.log("Out happend");
	return (cellEdit) => {
		console.log("In happend");
		 let editedTask = { ...task };
		editedTask[cellId] = cellEdit;
		changeTabData({ editedTask: editedTask, type: "EDIT_TASK" });
	};
}
 */

/* changeCellData({ content: cellText }); */
