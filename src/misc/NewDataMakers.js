import defaults, { NEW_COLUMN_DATA } from "../defaults";
import { makeKey, newTimeStamp } from ".";
import DescriptionCell from "../Layout/Project/Group/Task/Cells/DescriptionCell/DescriptionCell";

/* tasksQuerie: ["a", "b", "empty", "last"], */

function NewColumn(type) {
	return { id: makeKey(), ...NEW_COLUMN_DATA[type], timeStamp: newTimeStamp() };
}

function NewGroup(type, project) {
	// TODO: This needs a type that changes its behaviour!
	const newGroup = {
		id: makeKey(),
		name: "",
		columns: [],
		tasks: [],
		tasksQuerie: [],
		timeStamp: newTimeStamp(),
	};
	const normalGroupNumOfTasks = 1; // this needs to be according to group type
	const normalGroupColumnsTMP = ["description", "text", "text", "text", "text"]; // this needs to be according to group type
	//TODO: Issue here: theres a problame with spacing when only one Cell exists
	normalGroupColumnsTMP.forEach((ofType) => {
		newGroup.columns.push(NewColumn(ofType));
	});
	for (let i = 0; i < normalGroupNumOfTasks; i++) {
		let newTask = NewTask(newGroup.columns);
		project.tasks[newTask.id] = newTask; // TODO: This needs to come from the projects reducer?
		newGroup.tasksQuerie.push(newTask.id);
	}
	return newGroup;
	// TODO: add a column for basic task description (the first static column)
}

function NewTask(columns) {
	const newTask = { id: makeKey(), timeStamp: newTimeStamp() }; // DOSE THIS NEED A TIMESTAMP?
	columns.forEach((column) => {
		if (NEW_COLUMN_DATA[column.type]) {
			newTask[column.id] = {
				id: column.id,
				content: NEW_COLUMN_DATA[column.type].newCellContent,
				timeStamp: newTimeStamp(), // DOSE THIS NEED A TIMESTAMP?
			};
		}
	});

	return newTask;
}

export { NewGroup, NewColumn, NewTask };
