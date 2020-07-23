import React from "react";
import PropTypes from "prop-types";
import style from "./UserIcon.module.css";

function UserIcon({
	onClickCallback,
	userName = null,
	userIcon = "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png",
}) {
	console.log(`url(" ${userIcon} ")`);
	return (
		<div onClick={onClickCallback}>
			<div className={style["user-icon"]} style={{ backgroundImage: `url("${userIcon}")` }} />
			{userName ? <div className={style["user-name"]}>{userName}</div> : null}
		</div>
	);
}

UserIcon.propTypes = {};

export default UserIcon;
