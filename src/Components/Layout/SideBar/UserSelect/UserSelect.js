import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../ContextProviders/AppContextProvider";
import { setCrappyServerData, getCrappyServerData } from "../../../ServerProvider";

import UserIcon from "../../../misc/GlobalComponents/UserIcon/UserIcon";

let users;
getCrappyServerData("users").then((res) => (users = res));

function UserSelect() {
	const { currentUser, setCurrentUser } = useContext(AppContext);

	console.log("USERS", users);
	const [usersMenu, setUsersManu] = useState(false);

	function onClick() {
		setUsersManu(!usersMenu);
	}

	function changeToUser(userId) {
		getCrappyServerData(`users.${userId}`).then((res) => setCurrentUser(res));
		setUsersManu(!usersMenu);
	}

	return (
		<>
			<UserIcon userName={currentUser.name} onClickCallback={onClick} userIcon={currentUser.icon} />
			{usersMenu ? (
				<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
					{Object.keys(users).map((key) => {
						return (
							<UserIcon
								userName={users[key].name}
								onClickCallback={() => changeToUser(users[key].id)}
								userIcon={users[key].icon}
							/>
						);
					})}
				</div>
			) : null}
		</>
	);
}

UserSelect.propTypes = {};

export default UserSelect;
