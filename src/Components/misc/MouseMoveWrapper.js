import React from "react";
import PropTypes from "prop-types";

import defaults from "../defaults";

function MouseMoveWrapper({
	columnIsDragged,
	setMouseXposition,
	setColumnIsDragged,
	changeTabData,
	...props
}) {
	const onMouseMove = (e) => {
		if (columnIsDragged) {
			setMouseXposition(e.clientX);
		}
	};
	const onMouseUp = () => {
		if (columnIsDragged) {
			changeTabData({
				newData: { isDragged: false, spacer: defaults.SPACER_WIDTH },
				type: "EDIT_ALL_COLUMNS",
			});
			setColumnIsDragged(false);
		}
	};

	return (
		<div onMouseMove={(e) => onMouseMove(e)} onMouseUp={onMouseUp}>
			{/*ADD DYNAMIC DRAG CONTENT HERE*/}
			{props.children}
		</div>
	);
}

MouseMoveWrapper.propTypes = {};

export default MouseMoveWrapper;
