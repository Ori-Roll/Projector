import React, { useState } from "react";
import PropTypes from "prop-types";

import ColumnHeadPopup from "./ColumnHeadPopup";

import style from "./ColumnHead.module.css";

function ColumnHead({ column /* changeGroupData */ }) {
	const [hovered, setHovered] = useState(false);

	function onHeadChange() {
		console.log("Change Head!");
	}

	function onMouseDown() {
		console.log("Mouse Down!");
		/* 	changeGroupData({
			editedColumn: {
				//editedColumn need to be renamed changedColumn or maby just column
				id: column.id,
				isDragged: true,
			},
			type: "EDIT_COLUMN",
		}); */
	}

	return (
		<div
			className={style["column-head-wrapper"]}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setTimeout(() => setHovered(false), 200)}>
			<div // TODO: DO I NEED THIS ?
				className={style["column-content-wrapper"]}
				style={{ width: column.width }}>
				<input className={style["column-head-item"]} value={column.title} onChange={onHeadChange} />
			</div>

			{/* <ColumnHeadPopup hovered={hovered} column={column} onMouseDown={onMouseDown} /> */}
		</div>
	);
}
/* :{ backgroundColor: column.color ? column.color} */
ColumnHead.propTypes = {};

export default ColumnHead;
