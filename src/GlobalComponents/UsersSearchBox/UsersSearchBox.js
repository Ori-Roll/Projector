import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { db_getUsersByEmailQuery } from "../../Components/ServerProvider/users";

import style from "./UsersSearchBox.module.css";
import UsersListItem from "../UsersListItem/UsersListItem";

function AssignedUsersMenu({ onAddUserCallback, lable = true, ignoreUsers }) {
	const minCharForQuery = 2;

	const [searchBoxActive, setSearchBoxActive] = useState(false);

	const [searchByEmail, setSearchByEmail] = useState("");
	const [searchByEmailResults, setSearchByEmailResults] = useState([]);

	async function newSearchQuery(value) {
		const usersResults = await db_getUsersByEmailQuery(value);

		usersResults.filter((userRes) => {
			return ignoreUsers.find((user) => user._id === userRes._id) === undefined;
		}); // TODO: This filter does not work
		console.log("usersResults is , ", usersResults)
		setSearchByEmailResults(usersResults);
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
		onAddUserCallback(user);
	}

	function onSearchBoxBlur() {
		setTimeout(() => setSearchBoxActive(false), 100); //TODO: fix this
		setSearchByEmail("");
	}

	return (
		<div className={style["search-wrapper"]} >
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
			{searchBoxActive  && (
				<ul className={style["user-suggestion-ul"]} >
					{searchByEmailResults.map((userRes) => {
						return <UsersListItem
							key={userRes._id}
							user={userRes}
							onClickCallback={onSelectUserByEmail}
						/>
					})}
				</ul>
			)}
		</div>
	);
}

AssignedUsersMenu.propTypes = {};

export default AssignedUsersMenu;
