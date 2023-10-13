import { useState } from 'react'
import { useTaskContext } from '@/contexts/TaskContext'
import Task from '@/classes/Task';

export default function Popup ({children}:any) {
	const [title,       set_title]       = useState("");
	const [description, set_description] = useState("");
	const {
		popup,                set_popup,
		task_array,           set_task_array,
		task_component_array, set_task_component_array
	} = useTaskContext();

	if (popup)
		return (
			<>
				<div className = {`flex flex-col absolute justify-center align-middle w-screen bg-green-100  h-[500px]`}>
					<input placeholder="Title" onChange={(e)=>{set_title(e.target.value)}}/>
					<input placeholder="Description" onChange={(e)=>{set_description(e.target.value)}} />
					<button onClick={()=>{
						const penultimate_task = task_array[task_array.length - 1];
						const new_task_id = penultimate_task ? (penultimate_task.identifier + 1) : 1;
						const new_task = new Task(new_task_id);
						new_task.title = title;
						new_task.description = description;
						new_task.set_task();

					}}>
						Save
					</button>
				</div>
			</>
		)
}
