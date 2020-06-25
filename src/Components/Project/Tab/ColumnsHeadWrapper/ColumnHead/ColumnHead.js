import React, { useRef } from "react";
import PropTypes from "prop-types";

import style from "./ColumnHead.module.css";

function ColumnHead({ column, columnIsDragged, setColumnIsDragged, changeTabData }) {
	function onMouseDown(e) {
		setColumnIsDragged(true);
		changeTabData({
			newColumn: {
				id: column.id,
				isDragged: true,
			},
			type: "EDIT_COLUMN",
		});
	}

	return (
		<div
			className={style["column-head-item"]}
			style={
				column.isDragged
					? { width: column.width, transform: "scale(0.90, 0.90)", opacity: "60%" }
					: { width: column.width }
			}
			onMouseDown={(e) => onMouseDown(e)}>
			{column.id}
		</div>
	);
}
/* :{ backgroundColor: column.color ? column.color} */
ColumnHead.propTypes = {};

export default ColumnHead;

/* 

function absolutePosition(element) {
    let top,
        left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top,
        left: left,
    };
}

const position = useRef(null);

if (position.current) {
}

async function onMouseClick() {
    await position.current;
    console.log(position.current.getBoundingClientRect());
} */
