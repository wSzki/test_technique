


// =============================================================================
//  Started with a class but eventually realized localStorage
//  doesn't handle class methods, so exported set_task() to a function
// =============================================================================

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

export function delete_task (task:Task, task_array:Task[], set_task_array:any) {
	const found_task = task_array.find((it_task:Task) => it_task.identifier === task.identifier);
	if (found_task) {
		const new_task_array = task_array.filter((it_task:any) => it_task.identifier !== task.identifier);
		set_task_array(new_task_array);
		localStorage.setItem('Tasks', JSON.stringify(new_task_array))
	}
}

export function  set_task(task:Task, task_array:Task[], set_task_array:any) {
	// =====================================================================
	// Modify Task if identifier is found
	// =====================================================================
	const found_task = task_array.find((it_task:Task) => it_task.identifier === task.identifier);
	if (found_task) {
		localStorage.setItem('Tasks', JSON.stringify(task_array))
	}

	// =========================================================================
	// Create Task if it doesn't exist
	// =========================================================================
	else {
		task_array.push(task)
		set_task_array(task_array)
		localStorage.setItem('Tasks', JSON.stringify(task_array))
	}
}


