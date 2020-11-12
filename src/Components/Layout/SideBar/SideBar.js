import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import ProjectSelect from "./ProjectSelect/ProjectSelect";

import UserOptions from "./UserOptions/UserOptions";
import AddNewProject from "./AddNewProject/AddNewProject"
import Notifications from "./Notifications/Notifications";
import style from "./SideBar.module.css";

import { setUserDispatch } from "../../redux/rootReducer";

function SideBar() {
	const user = useSelector((state) => state?.user);
	const dispatch = useDispatch();
	const setUser = (user) => dispatch(setUserDispatch(user));


	return (
		<div className={style["side-bar"]}>
			<ProjectSelect />
			<div className={style["general"]}>
				<AddNewProject/>
				<UserOptions/>
				<Notifications />
			</div>
		</div>
	);
}

SideBar.propTypes = {};

export default SideBar;
