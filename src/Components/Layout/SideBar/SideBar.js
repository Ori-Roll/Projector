import React from "react";
import PropTypes from "prop-types";
import ProjectSelect from "./ProjectSelect/ProjectSelect";

import UserSelect from "./UserSelect/UserSelect";
import style from "./SideBar.module.css";

import { uploadUserPhoto } from "../../ServerProvider/auth";

function SideBar() {
	async function uploadPhotoClick(e) {
		/* e.preventDefault(); */

		console.log("CLICK");
	}

	function onUserPhotoUpload(e) {
		console.log("e.target.files[0]", e.target.files[0]);
		uploadUserPhoto(e.target.files[0]);
	}

	return (
		<div className={style["side-bar"]}>
			<ProjectSelect />
			<div className={style["general"]}>
				<UserSelect />

				<div className={style["upload-image-wrapper"]}>
					<label htmlFor='file-input'>
						<img
							onClick={uploadPhotoClick}
							className={style["upload-image-current"]}
							src='http://localhost:5000/api/v0/auth'
						/>
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
