import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ProjectTab.module.css";

const ProjectTab = (props) => {
	const [thisWidth, setThisWidth] = useState("150px");
	const [tabIsDragged, setTabIsDragged] = useState(false);

	function onMouseDown(e) {
		setTabIsDragged(true);
		console.log("down");
	}

	function onMouseUp(e) {
		setTabIsDragged(false);
		console.log("up");
	}

	function onDragStart(e) {
		/* e.preventDefault(); */
		console.log(e.target);
	}

	const draggableRef = useRef();

	return (
		<div className={styles["project-tab"]}>
			<div className={styles["project-tab-content"]} style={{ width: thisWidth }}>
				<span className={styles["SomeContent"]}>TASKKKK</span>
			</div>
			<div
				ref={draggableRef}
				draggable={true}
				onDragEnter={() => console.log("hay")}
				onDragStart={(e) => {
					onDragStart(e);
				}}
				/* onDragOver={() => console.log("over")} */
				onDragEnd={() => console.log("end")}
				className={styles["tab-size-handle"]}
			/>
		</div>
	);
};

ProjectTab.propTypes = {};

export default ProjectTab;
