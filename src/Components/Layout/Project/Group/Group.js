import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import Task from "./Task/Task";

function Group({ group }) {
	const [columns, setColumns] = useState([...group.columns]);
	const [tasks, setTasks] = useState([...group.tasks]);
	console.log("%c GROUP RENDER", "font-weight: bold; font-size: 20px; color: red;");
	console.log("group is: ", group);
	console.log("group tasks are: ", tasks);
	console.log("group columns are: ", columns);
	useEffect(() => {
		console.log("%c GROUP MOUNT (effect!)", "font-weight: bold; font-size: 30px; color: red;");
	}, []);
	useEffect(
		//This needs to run here if I want to change only the group
		_.debounce(() => console.log("debounced run a func to change data on database"), 2000),
		[group]
	);
	return (
		<div>
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
	);
}

Group.propTypes = {};

export default Group;
