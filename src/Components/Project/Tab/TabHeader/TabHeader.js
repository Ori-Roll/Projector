import React, { useState } from "react";
import PropTypes from "prop-types";

import style from "./TabHeader.module.css";

function TabHeader({ toggleTabIsOpen, tabIsOpen }) {
	const [headerIsOpen, setHeaderIsOpen] = useState(tabIsOpen);

	const onHeaderClick = () => {
		setHeaderIsOpen(!tabIsOpen);
		toggleTabIsOpen();
	};

	return (
		<div
			className={style["tab-header"]}
			style={{ fontWeight: tabIsOpen ? "600" : "400" }}
			onClick={onHeaderClick}>
			This is a header
		</div>
	);
}

TabHeader.propTypes = {};

export default TabHeader;
