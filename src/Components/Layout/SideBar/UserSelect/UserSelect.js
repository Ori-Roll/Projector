import React from "react";
import PropTypes from "prop-types";
import UserIcon from "../../../misc/GlobalComponents/UserIcon/UserIcon";

function UserSelect({ currentUser }) {
	return (
		<div>
			<UserIcon userName={currentUser} />
		</div>
	);
}

UserSelect.propTypes = {};

export default UserSelect;
