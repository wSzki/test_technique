

function get_all_tasks() : Task[] {
	const tasks      = localStorage.getItem('Tasks') ?? "[]";
	const task_array = JSON.parse(tasks)
	return (task_array)
}



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

	task_in_array() : Task | undefined {
		// =====================================================================
		// Returns a Task if it exists the array
		// =====================================================================
		let tasks = get_all_tasks();
		let found_task = tasks.find((task:Task) => task.identifier === this.identifier);
		return found_task;
	}

	get_task() : Task {
		return this
	}

	set_task() {
		//console.log(this);
		const tasks      = get_all_tasks();
		let   found_task = this.task_in_array();

		// =====================================================================
		// If the task exists, modify it; else push it to the end of th earray
		// =====================================================================
		//if (found_task) {
		//found_task = this;
		//localStorage.setItem('Tasks', JSON.stringify(tasks))
		//}

		//else {
		tasks.push(this)
		console.log(tasks);
		localStorage.setItem('Tasks', JSON.stringify(tasks))
		//}
	}

	rm_task() {
	}
}
