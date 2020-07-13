import React, { useState } from "react";
import PropTypes from "prop-types";

import ColumnHeadPopup from "./ColumnHeadPopup";

import style from "./ColumnHead.module.css";

function ColumnHead({ column, draggedColumn, setDraggedColumn, changeTabData }) {
	const [hovered, setHovered] = useState(false);

	function onHeadChange() {
		console.log("changeHead!");
	}

	function onMouseDown() {
		setDraggedColumn(column);
		changeTabData({
			editedColumn: {
				//editedColumn need to be renamed changedColumn or maby just column
				id: column.id,
				isDragged: true,
			},
			type: "EDIT_COLUMN",
		});
	}

	return (
		<div
			className={style["column-head-wrapper"]}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setTimeout(() => setHovered(false), 200)}>
			<div // TODO: DO I NEED THIS ?
				className={style["column-content-wrapper"]}
				style={
					column.isDragged ? { width: column.width, opacity: "20%" } : { width: column.width }
				}>
				<input className={style["column-head-item"]} value={column.id} onChange={onHeadChange} />
			</div>
			<ColumnHeadPopup
				hovered={hovered}
				draggedColumn={draggedColumn}
				column={column}
				onMouseDown={onMouseDown}
			/>
		</div>
	);
}
/* :{ backgroundColor: column.color ? column.color} */
ColumnHead.propTypes = {};

export default ColumnHead;
