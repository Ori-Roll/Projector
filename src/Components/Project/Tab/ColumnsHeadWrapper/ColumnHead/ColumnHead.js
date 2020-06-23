import React, { useRef } from "react";
import PropTypes from "prop-types";

import style from "./ColumnHead.module.css";

function ColumnHead({ column }) {
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
	}

	return (
		<div
			className={style["column-head-item"]}
			style={{
				width: column.width,
				backgroundColor: column.color ? column.color : {},
			}}
			ref={position}
			onClick={(e) => onMouseClick(e)}>
			{column.id}
		</div>
	);
}

ColumnHead.propTypes = {};

export default ColumnHead;
