import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import style from "./TextCell.module.css";
import CellsStyle from "../CellsStyle.module.css";

import { NEW_COLUMN_DATA } from "../../../../../../defaults";

function TextCell({ cell, doCellChange }) {
	const [cellText, setCellText] = useState(cell.content);
	//	console.log(`%c ------cell render! content: ${cell.content}---------`, "color: green");
	/* useEffect(() => console.log("%c TextCell MOUNT!", "color:red"), []); */

	function onInputChange(text) {
		//console.log("CHANGE - DEBOUNCE ", { ...cell, content: text });
		doCellChange({ ...cell, content: text }, true);
	}

	function onBlur(text) {
		//console.log("CHANGE - BLUR", { ...cell, content: text });
		doCellChange({ ...cell, content: text }, false);
	}

	return (
		<input
			className={`${CellsStyle.cell} ${style["text-cell"]}`}
			value={cell.content}
			onChange={(e) => onInputChange(e.target.value)}
			onBlur={(e) => onBlur(e.target.value)}
		/>
	);
}

// TextCell.propTypes = {};

/* export default TextCell; */

export default React.memo(TextCell, (prevProps, nextProps) => {
	// if (prevProps.cell.content === "" && nextProps.cell.content === "") return true;
	// return prevProps.cell.content === nextProps.cell.content;
	return _.isEqual(prevProps, nextProps);
});
