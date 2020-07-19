import defaults, { NEW_COLUMN_DATA } from "../defaults";
import { makeKey } from ".";
import DescriptionCell from "../Layout/Project/Tab/Task/Cells/DescriptionCell/DescriptionCell";

/* tasksQuerie: ["a", "b", "empty", "last"], */

function NewColumn(type) {
	return { id: makeKey(), ...NEW_COLUMN_DATA[type] };
}

function NewTab(type, project) {
	console.log("---> ------------------------------");
	/* console.log("---> project tasks starts as,", project.tasks); */
	// TODO: This needs a type that changes its behaviour!
	const newTab = { id: makeKey(), name: "", columns: [], tasks: [], tasksQuerie: [] };
	const normalTabColumnsTMP = ["description", "text", "status", "number", "stars"]; // this needs to be according to tab type
	//TODO: Issue here: theres a problame with spacing when only one Cell exists
	normalTabColumnsTMP.forEach((ofType) => {
		newTab.columns.push(NewColumn(ofType));
	});
	const normalTabNumOfTasks = 1; // this needs to be according to tab type
	for (let i = 0; i < normalTabNumOfTasks; i++) {
		let newTask = NewTask(newTab.columns);
		/* console.log("---> project gets task ,", newTask.id); */
		project.tasks[newTask.id] = newTask; // TODO: This needs to come from the projects reducer?
		/* console.log("---> project tasks is,", project.tasks); */
		newTab.tasksQuerie.push(newTask.id);
	}
	console.log("NewTab --- ", newTab);
	return newTab;
	// TODO: add a column for basic task description (the first static column)
}

function NewTask(columns) {
	const newTask = { id: makeKey() };
	columns.forEach((column) => {
		if (NEW_COLUMN_DATA[column.type]) {
			newTask[column.id] = { id: column.id, content: NEW_COLUMN_DATA[column.type].newCellContent };
		}
	});

	return newTask;
}

export { NewTab, NewColumn, NewTask };
