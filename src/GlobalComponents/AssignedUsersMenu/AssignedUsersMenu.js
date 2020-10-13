import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { db_getUsersByEmailQuery } from "../../Components/ServerProvider/users";

//import UserIcon from "./../../Components/misc/GlobalComponents/UserIcon/UserIcon";

import style from "./AssignedUsersMenu.module.css";
import UserIcon from "../../Components/misc/GlobalComponents/UserIcon/UserIcon";

function AssignedUsersMenu({ assign, setAssignedUsersMenuIsOn, onAssignUsersToTask }) {
	const minCharForQuery = 2;

	const [searchByEmail, setSearchByEmail] = useState("");

	const [searchByEmailResults, setSearchByEmailResults] = useState([]);

	function onModalClick() {
		setAssignedUsersMenuIsOn(false);
	}

	async function newSearchQuery(value) {
		const usersResults = await db_getUsersByEmailQuery(value);
		console.log("usersResults----------------->", usersResults);
		setSearchByEmailResults([...usersResults]);
	}

	const debouncedEmailSearch = _.debounce((value) => {
		console.log("object");
		newSearchQuery(value);
	}, 500);

	function onSearchByEmailChange(value) {
		setSearchByEmail(value);
		value.length > minCharForQuery && debouncedEmailSearch(value);
	}

	return (
		<div className={style["modal"]} onClick={onModalClick}>
			<form
				className={style["form-wrapper"]}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<label className={style["search-lable"]} htmlFor='search-by-email'>
					Search for someone by his Email:
				</label>
				<input
					id='search-by-email'
					className={style["search-input"]}
					onChange={(e) => onSearchByEmailChange(e.target.value)}
					value={searchByEmail}
					placeholder='Search by email'
					name='searchByEmail'
					autoComplete='off'
				/>
				{searchByEmailResults.length > minCharForQuery && (
					<ul className={style["user-suggestion-ul"]}>
						{searchByEmailResults.map((userRes) => (
							<li key={userRes._id} className={style["user-suggestion-li"]}>
								<div className={style["user-icon-wrapper"]}>
									<UserIcon
										key={userRes._id}
										userName={userRes.name}
										userPhoto={userRes.photo}
										userId={userRes._id}
									/>
								</div>
								<div>
									<p>{userRes.name}</p>
									<h2>{userRes.email}</h2>
								</div>
							</li>
						))}
					</ul>
				)}
			</form>
		</div>
	);
}

AssignedUsersMenu.propTypes = {};

export default AssignedUsersMenu;
