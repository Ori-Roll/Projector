import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import _, { cloneDeep } from "lodash";

import style from "./MouseMoveWrapper.module.css";

import defaults from "../defaults";

// 	TODO: Maybe this needs to control every aspect of drag and to be a reducer
//	that takes dispatches from components and changes tabData with it
/* 
function mouseMoveWrapperReducer(state, action) {
	const newState = _.cloneDeep(state);
	switch (action.type) {
		case "TMP":
			return;
	}
}
 */
function MouseMoveWrapper({
	draggedColumn,
	setDraggedColumn,
	resizedColumn,
	setResizedColumn,
	mouseXposition,
	setMouseXposition,
	changeTabData,
	...props
}) {
	const [resizeDelta, setResizeDelta] = useState(0);

	const wrapperRef = useRef(null);

	const onMouseMove = (e, draggedColumn, resizedColumn, resizeDelta) => {
		if (draggedColumn) {
			setMouseXposition(e.clientX + wrapperRef.current.scrollLeft);
		}
		if (resizedColumn) {
			if (resizedColumn.width + resizeDelta < resizedColumn.minWidth) return;
			if (resizedColumn.width + resizeDelta > resizedColumn.maxWidth) return;
			changeTabData({
				editedColumn: {
					...resizedColumn,
					width: resizedColumn.width + resizeDelta,
				},
				type: "EDIT_COLUMN",
			});
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
		} else if (resizedColumn) {
			setResizeDelta(0);
			setResizedColumn(null);
		}
	};

	const delayedMouseMove = useCallback(
		_.throttle(
			(e, draggedColumn, resizedColumn, resizeDelta) => {
				onMouseMove(e, draggedColumn, resizedColumn, resizeDelta);
			},
			32,
			{ trailing: true, leading: true }
		),
		[]
	);

	return (
		<div>
			{draggedColumn || resizedColumn ? (
				<div
					key={`mouseMoveWrapper`}
					onMouseMove={(e) => {
						e.persist();
						setResizeDelta((delt) => {
							return delt + e.movementX;
						});

						delayedMouseMove(e, draggedColumn, resizedColumn, resizeDelta);
					}}
					/* onMouseMove={(e) => {
						e.persist();
						onMouseMove(e, draggedColumn, resizedColumn);
					}} */
					onMouseUp={onMouseUp}
					onMouseLeave={onMouseUp}
					ref={wrapperRef}>
					{/*ADD DYNAMIC DRAG CONTENT HERE*/}

					{props.children}
					{draggedColumn ? (
						<div>
							<div
								className={style["floating-column"]}
								style={{
									left: mouseXposition - 70,
								}}></div>
						</div>
					) : null}
				</div>
			) : (
				<div key={`mouseMoveWrapper`} onMouseUp={onMouseUp}>
					{props.children}
				</div>
			)}
		</div>
	);
}

MouseMoveWrapper.propTypes = {};

export default MouseMoveWrapper;
