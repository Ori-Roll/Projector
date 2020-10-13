import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { db_getUsersByEmailQuery } from "../../Components/ServerProvider/users";

import style from "./UsersSearchBox.module.css";
import UserIcon from "../UserIcon/UserIcon";

function AssignedUsersMenu({ onAddUserCallback, lable = true }) {
	const minCharForQuery = 2;

	const [searchBoxActive, setSearchBoxActive] = useState(false);

	const [searchByEmail, setSearchByEmail] = useState("");
	const [searchByEmailResults, setSearchByEmailResults] = useState([]);

	async function newSearchQuery(value) {
		const usersResults = await db_getUsersByEmailQuery(value);
		setSearchByEmailResults([...usersResults]);
	}

	const debouncedEmailSearch = _.debounce((value) => {
		newSearchQuery(value);
	}, 500);

	function onSearchByEmailChange(value) {
		setSearchBoxActive(true);
		setSearchByEmail(value);
		value.length > minCharForQuery && debouncedEmailSearch(value);
	}

	function onSelectUserByEmail(e, user) {
		e.stopPropagation();
		onAddUserCallback(user);
	}

	function onSearchBoxBlur() {
		setTimeout(() => setSearchBoxActive(false), 100); //TODO: fix this
	}

	return (
		<div className={style["search-wrapper"]}>
			{lable && (
				<label className={style["search-lable"]} htmlFor='search-by-email'>
					Search for someone by his Email:
				</label>
			)}
			<input
				id='search-by-email'
				className={style["search-input"]}
				onChange={(e) => onSearchByEmailChange(e.target.value)}
				value={searchByEmail}
				placeholder='Search by email'
				name='searchByEmail'
				autoComplete='off'
				onBlur={onSearchBoxBlur}
			/>
			{searchBoxActive && searchByEmailResults.length > minCharForQuery && (
				<ul className={style["user-suggestion-ul"]}>
					{searchByEmailResults.map((userRes) => (
						<li
							key={userRes._id}
							className={style["user-suggestion-li"]}
							onClick={(e) => onSelectUserByEmail(e, userRes)}>
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
		</div>
	);
}

AssignedUsersMenu.propTypes = {};

export default AssignedUsersMenu;
