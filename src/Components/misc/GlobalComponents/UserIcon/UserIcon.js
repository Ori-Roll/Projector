import React from "react";
import PropTypes from "prop-types";
import style from "./UserIcon.module.css";

function UserIcon({ onClickCallback, userName = null, userPhoto, userId }) {
	const photoUrl = `http://localhost:5000/api/v0/auth/getUserPhoto/${userId}`;
	return (
		<div onClick={onClickCallback} className={style["user-icon-inner-wrapper"]}>
			<div
				className={style["user-icon"]}
				style={{ backgroundImage: `url("${photoUrl}?version=${userPhoto}")` }}
			/>
			{/* {userName && <div className={style["user-name"]}>{userName}</div>} */}
		</div>
	);
}

UserIcon.propTypes = {};

export default UserIcon;
