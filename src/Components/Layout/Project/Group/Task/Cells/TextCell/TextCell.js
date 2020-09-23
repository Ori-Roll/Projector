import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import style from "./TextCell.module.css";
import CellsStyle from "../CellsStyle.module.css";

import { NEW_COLUMN_DATA } from "../../../../../../defaults";

function TextCell({ cell, doCellChange }) {
	const [cellText, setCellText] = useState(cell.content);

	/* console.log(`%c ------cell render! content: ${cell.content}---------`, "color: green"); */
	/* useEffect(() => console.log("%c TextCell MOUNT!", "color:red"), []); */

	function onInputChange(text) {
		setCellText(text);
		console.log("CHANGE ", { ...cell, content: text });
		doCellChange({ ...cell, content: text }, true);
	}

	function onBlur() {
		console.log("CHANGE ", { ...cell, content: cellText });
		doCellChange({ ...cell, content: cellText }, false);
	}

	return (
		<input
			className={`${CellsStyle.cell} ${style["text-cell"]}`}
			value={cellText}
			onChange={(e) => onInputChange(e.target.value)}
			onBlur={() => onBlur()}
		/>
	);
}

TextCell.propTypes = {};

/* export default TextCell; */

export default React.memo(TextCell, (prevProps, nextProps) => {
	if (prevProps.cell.content === "" && nextProps.cell.content === "") return true;
	return prevProps.cell.content !== nextProps.cell.content ? true : false;
});
