import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./StarsCell.module.css";

function StarsCell({ cellData }) {
	const [starsOn, setStarsOn] = useState(3);

	let allStars = new Array(5);

	return (
		<div className={style["star-cell"]}>
			{allStars.fill(undefined).map((item, i) => {
				return starsOn > i ? <div key={`${i}`}>&#9733;</div> : <div key={`${i}`}>&#9734;</div>;
			})}
		</div>
	);

	/* for (let i = 5; i > 0; i++) {
			return starsOn >= i ? <div>&#9733;</div> : <div>&#9734;</div>;
		} */
}

StarsCell.propTypes = {};

export default StarsCell;
