import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import ProjectSelect from "./ProjectSelect/ProjectSelect";

import UserSelect from "./UserSelect/UserSelect";
import UserIcon from "../../../GlobalComponents/UserIcon/UserIcon";
import style from "./SideBar.module.css";

import { uploadUserPhoto } from "../../ServerProvider/auth";

import { setUserDispatch } from "../../redux/rootReducer";

function SideBar() {
	const user = useSelector((state) => state?.user);
	const dispatch = useDispatch();
	const setUser = (user) => dispatch(setUserDispatch(user));

	async function uploadPhotoClick(e) {
		/* e.preventDefault(); */

		console.log("CLICK");
	}

	async function onUserPhotoUpload(e) {
		try {
			let updatedUser = await uploadUserPhoto(e.target.files[0]);
			updatedUser = updatedUser.data;
			console.log("updatedUser ", updatedUser);
			setUser(updatedUser);
		} catch (error) {
			console.error("No user update on photo change", error);
		}
	}

	return (
		<div className={style["side-bar"]}>
			<ProjectSelect />
			<div className={style["general"]}>
				<UserSelect />

				<div className={style["upload-image-wrapper"]}>
					<label htmlFor='file-input'>
						<div className={style["user-icon-wrapper"]}>
							<UserIcon
								userName={user.name}
								userId={user._id}
								userPhoto={user.photo}
								onClickCallback={uploadPhotoClick}
							/>
						</div>
					</label>

					<input
						id='file-input'
						type='file'
						className={style["upload-image-input"]}
						onChange={(e) => onUserPhotoUpload(e)}
					/>
				</div>
				<br></br>
			</div>
		</div>
	);
}

SideBar.propTypes = {};

export default SideBar;
