import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import style from "./TextCell.module.css";
import CellsStyle from "../CellsStyle.module.css";

import { NEW_COLUMN_DATA } from "../../../../../../defaults";

function TextCell({ id, content, cellChange }) {
	const [cellText, setCellText] = useState(content);

	console.log(`%c ------cell render! content: ${content}---------`, "color: green");
	/* useEffect(() => console.log("%c TextCell MOUNT!", "color:red"), []); */

	function onInputChange(text) {
		setCellText(text);
		cellChange(id, text, true);
	}

	function onBlur() {
		cellChange(id, cellText, false);
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
	if (prevProps.content === "" && nextProps.content === "") return true;
	return prevProps.content !== nextProps.content ? true : false;
});
