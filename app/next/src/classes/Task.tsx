export default class Task {
	title       : string;
	description : string;
	completed   : boolean;
	createdAt   : Date;
	identifier  : number;

	constructor(identifier:number) {
		if (!identifier)    throw new Error("Identifier must be set");
		if (identifier < 0) throw new Error("Identifier must be positive");
		this.title       = "";
		this.description = "";
		this.completed   = false;
		this.createdAt   = new Date();
		this.identifier  = identifier;
	}
}

export function  set_task(task:Task, task_array:Task[]) {

	// =====================================================================
	// Modify Task If identifier is found
	// =====================================================================
	const found_task = task_array.find((it_task:Task) => it_task.identifier === task.identifier);
	if (found_task) {
		localStorage.setItem('Tasks', JSON.stringify(task_array))
	}

	// =========================================================================
	// Create Task if it doesn't exist
	// Pushing to array, triggering rerender
	// =========================================================================
	else {
		task_array.push(task)
		localStorage.setItem('Tasks', JSON.stringify(task_array))
	}
}


