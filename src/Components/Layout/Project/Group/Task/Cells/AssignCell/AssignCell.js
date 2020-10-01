import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import style from "./AssignCell.module.css";
import CellsStyle from "../CellsStyle.module.css";

import UserIcon from "./../../../../../../misc/GlobalComponents/UserIcon/UserIcon";

function AssignCell({ cell, doCellChange, assign }) {
	const [cellAssignedTo, setCellAssignedTo] = useState(cell.assignedTo);

	/* console.log(`%c ------cell render! content: ${cell.content}---------`, "color: green"); */
	/* useEffect(() => console.log("%c AssignCell MOUNT!", "color:red"), []); */

	function onInputChange(text) {
		/* 	doCellChange({ ...cell, content: text }, true); */
	}

	function onBlur() {
		/* 		doCellChange({ ...cell, content: cellText }, false); */
	}

	return (
		<div>
			{assign.map((user) => (
				<UserIcon key={user._id} userName={user.name} userIcon={user.photo} />
			))}
		</div>
	);
}

AssignCell.propTypes = {};

/* export default AssignCell; */

export default React.memo(AssignCell, (prevProps, nextProps) => {
	if (prevProps.cell.content === "" && nextProps.cell.content === "") return true;
	return prevProps.cell.content !== nextProps.cell.content ? true : false;
});

{
	/* <input
			className={style["assign-cell"]}
			value={assign[0].name}
			onChange={(e) => onInputChange(e.target.value)}
			onBlur={() => onBlur()}
		/> */
}
