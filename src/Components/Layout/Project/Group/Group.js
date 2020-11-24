import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import _ from "lodash";

import Task from "./Task/Task";
import TaskAddFooter from "./TaskAddFooter/TaskAddFooter";
import ColumnsHeadWrapper from "./ColumnsHeadWrapper/ColumnsHeadWrapper";
import GroupHeader from "./GroupHeader/GroupHeader";
import style from "./Group.module.css"; // TODO: rename file to lowercase, in my projects it's always style(s).module.css

function Group({ group, groupIndex }) {
	const [groupIsOpen, setGroupIsOpen] = useState(true); // TODO: (Ori) this needs to initially come from backend
	return (
		/* TODO add classcat package:  */
		<div className={style["group"]}>
			<div className={style["group-header-wrapper"]}>
				<GroupHeader
					groupIsOpen={groupIsOpen}
					setGroupIsOpen={setGroupIsOpen}
					group={group}
					groupIndex={groupIndex}
				/>
			</div>
			<div
				className={style["group-content-wrapper"]}
				style={!groupIsOpen ? { backgroundColor: "red", display: "none" } : {}}>
				<ColumnsHeadWrapper key={group._id} columns={group.columns} groupIndex={groupIndex} />
				{group.loaded ? (
					group.tasks.map((task, i) => {
						return (
							<Task
								key={task._id}
								task={task}
								columns={group.columns}
								taskIndex={i}
								groupIndex={groupIndex}
							/>
						);
					})
				) : (
					<div>LOADER</div>
				)}
				<div className={style["task-add-wrapper"]}>
					<TaskAddFooter group={group} groupIndex={groupIndex} />
				</div>
			</div>
		</div>
	);
}

Group.propTypes = {};

export default Group;
