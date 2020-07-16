import React from "react";
import PropTypes from "prop-types";
import style from "./UserIcon.module.css";

function UserIcon({ onClickCallback, userName = null }) {
	return (
		<div onClick={onClickCallback}>
			<div className={style["user-icon"]} />
			{userName ? <div className={style["user-name"]}>{userName}</div> : null}
		</div>
	);
}

UserIcon.propTypes = {};

export default UserIcon;
