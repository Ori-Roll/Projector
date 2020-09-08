import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Task from "./Task/Task";
import ColumnsHeadWrapper from "./ColumnsHeadWrapper/ColumnsHeadWrapper";
import GroupHeader from "./GroupHeader/GroupHeader";
import style from "./Group.module.css"; // TODO: rename file to lowercase, in my projects it's always style(s).module.css

function Group({ group }) {
	const [columns, setColumns] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [groupIsOpen, setGroupIsOpen] = useState(true); // TODO: (Ori) this needs to initially come from backend

	console.log("%c GROUP RENDER", "font-weight: bold; font-size: 20px; color: red;");

	useEffect(() => {
		console.log("%c GROUP MOUNT (effect!)", "font-weight: bold; font-size: 30px; color: red;");
	}, []);
	useEffect(
		//This needs to run here if I want to change only the group
		() => {
			_.debounce(() => console.log("debounced run a func to change data on database"), 2000);
			setColumns([...group.columns]);
			setTasks([...group.tasks]);
		},
		[group]
	);
	return (
		/* TODO add classcat package:  */
		<div className={style.group}>
			<div className={style["group-header-wrapper"]}>
				<GroupHeader groupIsOpen={groupIsOpen} setGroupIsOpen={setGroupIsOpen} group={group} />
			</div>
			<div
				className={style["group-content-wrapper"]}
				style={!groupIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
				<ColumnsHeadWrapper
					key={group._id}
					columns={columns}
					/* changeGroupData={changeGroupData} */
				/>
				{group.loaded ? (
					group.tasks.map((task) => {
						/* return (
						<div>
							<div key={task._id}>{JSON.stringify(task, null, 2)}</div>
							<br />
						</div>
					); */

						return <Task key={task._id} task={task} columns={group.columns} />;
					})
				) : (
					<div>Loading</div>
				)}
			</div>
		</div>
	);
}

Group.propTypes = {};

export default Group;
