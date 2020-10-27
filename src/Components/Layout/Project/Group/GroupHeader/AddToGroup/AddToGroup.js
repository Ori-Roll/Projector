import React, { useState } from "react";
import PropTypes from "prop-types";

import { createNewColumn } from "../../../../../ServerProvider/columns";

import { useDispatch } from "react-redux";
import {
	addNewColumnSuccessDispatch,
	addNewColumnInitDispatch,
	addNewColumnFailedDispatch,
} from "../../../../../redux/rootReducer";

import style from "./AddToGroup.module.css";



function AddToGroup({ group, groupIndex }) {

	const dispatch = useDispatch();
	const addNewColumnSuccess = (newColumn, newTasks, groupIndex) =>
		dispatch(addNewColumnSuccessDispatch(newColumn, newTasks, groupIndex));
	const addNewColumnInit = () => dispatch(addNewColumnInitDispatch(groupIndex));
	const addNewColumnFailed = () => dispatch(addNewColumnFailedDispatch(groupIndex));

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function onMenuClick() {
		setIsMenuOpen(!isMenuOpen);
	}

	async function addColumnClick() {
		setIsMenuOpen(!isMenuOpen);
		addNewColumnInit();
		try {
			let createColumnRes = await createNewColumn(group);
			const updatedGroup = createColumnRes.data;
			addNewColumnSuccess(updatedGroup, groupIndex);
		} catch (error) {
			addNewColumnFailed();
			console.error(error);
		}
	}

	const menuItems = [
		<li key={"menu1"} onClick={addColumnClick}>
			<div className={style["column-icon"]}>T</div>
			<p>New Text Column</p>
		</li>,
		<li key={"menu2"}>
			<div className={style["column-icon"]}>N</div>
			<p>New Number Column</p>
		</li>,
		<li key={"menu3"}>
			<div className={style["column-icon"]}>U</div>
			<p>New Users Column</p>
		</li>,
	];

	return (
		<div>
			<button className={style["add-to-gorup-btn"]} onClick={onMenuClick}>
				&#43;
			</button>
			{isMenuOpen && (
				<ul className={style["add-to-group-menu"]}>{menuItems.map((item) => item)}</ul>
			)}
		</div>
	);
}

AddToGroup.propTypes = {};

export default AddToGroup;
