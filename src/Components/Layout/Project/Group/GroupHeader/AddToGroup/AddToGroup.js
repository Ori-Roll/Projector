import React from "react";
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

	async function addColumnClick() {
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

	return (
		<button className={style["add-to-gorup-btn"]} onClick={addColumnClick}>
			THIS
		</button>
	);
}

AddToGroup.propTypes = {};

export default AddToGroup;
