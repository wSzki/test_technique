import {useTaskContext} from "@/contexts/TaskContext";
import Task from "@/classes/Task";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function Tasks () {
	const {save_trigger,task_array, set_task_array } = useTaskContext();
	let key = 0;

	const [TaskInputComponentArray, set_TaskInputComponentArray] = useState<any[]>([]);

	useEffect(() => {
		const array = task_array.map((task:Task) => {
			return <Card key={key++} task={task}/>
		})
		set_TaskInputComponentArray(array)
		console.log("rerender triggered");
		console.log(task_array);

	}, [save_trigger, task_array.length])

	return TaskInputComponentArray;
}


