import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./UserIcon.module.css";

function UserIcon({
	onClickCallback,
	userName = null,
	userPhoto,
	userId,
	removable = false,
	onRemoveCallback = () => {
		console.error("no remove action");
	},
}) {
	const photoUrl = `http://localhost:5000/api/v0/auth/getUserPhoto/${userId}`;

	const [mouseIsOver, setMouseIsOver] = useState(false);

	return (
		<div
			onClick={removable ? () => onRemoveCallback(userId) : onClickCallback}
			onMouseOver={() => setMouseIsOver(true)}
			onMouseLeave={() => setMouseIsOver(false)}
			className={style["user-icon-inner-wrapper"]}
			title={userName}>
			<div
				className={style["user-icon"]}
				style={{ backgroundImage: `url("${photoUrl}?version=${userPhoto}")` }}
			/>
			{removable && (
				<div
					className={style["remove-btn"]}
					style={{ visibility: mouseIsOver ? "visible" : "hidden" }}
					onClick={() => onRemoveCallback(userId)}>
					&#x2716;
				</div>
			)}
			{/* {userName && <div className={style["user-name"]}>{userName}</div>} */}
		</div>
	);
}

UserIcon.propTypes = {};

export default UserIcon;
