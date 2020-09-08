import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./GroupArrow.module.css";

function GroupArrow({ groupIsOpen, setGroupIsOpen }) {
	const [arrowDown, setArrowDown] = useState(groupIsOpen);
	const diraction = {
		rotated: "rotate(90deg) translate(8%, -7%)",
		straight: "translateX(10%)",
	};

	useEffect(() => setArrowDown(groupIsOpen), [groupIsOpen]);

	const onArrowClick = () => {
		setGroupIsOpen(!groupIsOpen);
	};

	return (
		<div className={style["group-arrow-wrapper"]}>
			<div
				className={style["group-arrow"]}
				onClick={onArrowClick}
				style={arrowDown ? { transform: diraction.rotated } : { transform: diraction.straight }}>
				&#x27A4;
			</div>
		</div>
	);
}

GroupArrow.propTypes = {};

export default GroupArrow;
