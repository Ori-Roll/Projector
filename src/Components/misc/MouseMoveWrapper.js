import React from "react";
import PropTypes from "prop-types";

import defaults from "../defaults";

function MouseMoveWrapper({
	draggedColumn,
	setDraggedColumn,
	setMouseXposition,
	changeTabData,
	...props
}) {
	const onMouseMove = (e) => {
		if (draggedColumn) {
			setMouseXposition(e.clientX);
		}
	};
	const onMouseUp = () => {
		if (draggedColumn) {
			changeTabData({
				// this can have an issue with spacer having no "isDragged" to know what column gose there
				newData: { isDragged: false, spacer: defaults.SPACER_WIDTH },
				type: "EDIT_ALL_COLUMNS",
			});

			setDraggedColumn(null);
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
