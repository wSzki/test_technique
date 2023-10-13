import {useTaskContext} from "@/contexts/TaskContext";

import {AiFillCloseCircle} from 'react-icons/ai'
import {AiFillCheckCircle} from 'react-icons/ai'
import Task from "@/classes/Task";

function IndividualTaskInput ({task}:any) {
	return (
		<div className = {`flex rounded-lg justify-between m-[5px] p-[10px] bg-gray-100}`}>
			<div>
				<input placeholder={task.title} type="text" className = {`bg-gray-100 focus:outline-0 enabled:hover:border-gray-400  border-b-2 border-b-black p-[5px]`} />
				<input placeholder={task.description} type="text" className = {`bg-gray-100 focus:outline-0 enabled:hover:border-gray-400  border-b-2 border-b-black p-[5px]`} />
			</div>
			<div className = {`flex`}>
				<AiFillCloseCircle className = {`h-full text-[30px]`}color="red"/>
				<AiFillCheckCircle className = {`h-full text-[30px]`}color="green"/>
			</div>
		</div>

	)
}

export default function Tasks () {
	let key = 0;
	const {
		task_array,           set_task_array,
		//task_component_array, set_task_component_array
	} = useTaskContext();
	const TaskInputComponentArray = task_array.map((task:Task) => {
		return <IndividualTaskInput key={key++} task={task}/>
	})
	return TaskInputComponentArray;
}


