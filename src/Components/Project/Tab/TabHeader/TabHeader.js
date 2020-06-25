import React, { useState } from "react";
import PropTypes from "prop-types";

import TabArrow from "./TabArrow/TabArrow";
import style from "./TabHeader.module.css";

function TabHeader({ toggleTabIsOpen, tabIsOpen }) {
	const onHeaderClick = () => {
		toggleTabIsOpen();
	};

	return (
		<div className={style["tab-header-holder"]}>
			<TabArrow tabIsOpen={tabIsOpen} toggleTabIsOpen={toggleTabIsOpen} />
			<div
				className={style["tab-header"]}
				style={{ fontWeight: tabIsOpen ? "600" : "400" }}
				onClick={onHeaderClick}>
				This is a header
			</div>
		</div>
	);
}

TabHeader.propTypes = {};

export default TabHeader;
