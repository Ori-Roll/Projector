import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import style from "./StarsCell.module.css";

function StarsCell({ id, content, doCellContentChange }) {
	const [starsOnSet, setStarsOnSet] = useState(content);
	const [starsOn, setStarsOn] = useState(content);
	let allStars = new Array(5);

	return (
		<div className={style["star-cell"]}>
			{allStars.fill(undefined).map((item, i) => {
				return (
					<div
						key={`${i}`}
						onMouseOver={() => setStarsOn(i + 1)}
						onMouseLeave={() => setStarsOn(starsOnSet)}
						onClick={() => setStarsOnSet(i + 1)}>
						{starsOn > i ? <>&#9733;</> : <>&#9734;</>}
					</div>
				);
			})}
		</div>
	);
	/* `&#9733`; : `&#9734;` */
	/* for (let i = 5; i > 0; i++) {
			return starsOn >= i ? <div>&#9733;</div> : <div>&#9734;</div>;
		} */
}

StarsCell.propTypes = {};

export default StarsCell;
