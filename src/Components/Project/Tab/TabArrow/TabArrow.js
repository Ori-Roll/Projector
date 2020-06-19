import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./TabArrow.module.css";

function TabArrow({ tabIsOpen, setTabIsOpen }) {
	const [arrowDown, setArrowDown] = useState(tabIsOpen);
	const diraction = {
		rotated: "rotate(90deg) translate(8%, -7%)",
		straight: "translateX(10%)",
	};

	const onArrowClick = () => {
		setArrowDown(!arrowDown);
		setTabIsOpen(!tabIsOpen);
	};

	return (
		<div className={style["tab-arrow-holder"]}>
			<div
				className={style["tab-arrow"]}
				onClick={onArrowClick}
				style={arrowDown ? { transform: diraction.rotated } : { transform: diraction.straight }}>
				&#x27A4;
			</div>
		</div>
	);
}

TabArrow.propTypes = {};

export default TabArrow;
