import {useTaskContext} from "@/contexts/TaskContext";
import Task from "@/classes/Task";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

function TaskFactory () {
	const {save_trigger,task_array, set_task_array } = useTaskContext();
	let key = 0;

	const [TaskInputComponentArray, set_TaskInputComponentArray] = useState<any[]>([]);

	// =========================================================================
	// Rerendering all tasks on save
	// =========================================================================
	useEffect(() => {
		const array = task_array.map((task:Task) => {
			return <Card key={key++} task={task}/>
		})
		set_TaskInputComponentArray(array)

	}, [save_trigger, task_array.length])

	return TaskInputComponentArray;
}


function splitArray(array:any) {
	const subarrays:any = [[], [], [], []];

	for (let i = 0; i < array.length; i++) {
		subarrays[i % 4].push(array[i]);
	}

	return subarrays;
}

export default function Tasks ({children}:any) {

	const array = TaskFactory();
	console.log(array);

	const splitted_array = (splitArray(array));



return (
	<div className = {`flex justify-around w-screen pr-[40px] pb-[50px]`}>
		<div className = {`flex w-[23%] flex-col`}>{splitted_array[0]}</div>
		<div className = {`flex w-[23%] flex-col`}>{splitted_array[1]}</div>
		<div className = {`flex w-[23%] flex-col`}>{splitted_array[2]}</div>
		<div className = {`flex w-[23%] flex-col`}>{splitted_array[3]}</div>
	</div>
)
}
