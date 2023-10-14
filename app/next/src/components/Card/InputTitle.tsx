import { useEffect      } from 'react'
import { MdPending      } from 'react-icons/md'
import { MdCheckCircle  } from 'react-icons/md'
import { useCardContext } from '@/contexts/cardContext';
import { set_task       } from '@/classes/Task';
import { useTaskContext } from '@/contexts/TaskContext';

export default function Title ({task, nocheck}:any) {
	const value = task ? task.title : "";
	const {
		cancel_trigger,
		edit,
		title,
		form_error,
		set_title,
		completed,
		set_completed
	} = useCardContext();

	const {
			task_array,
		set_task_array,
} = useTaskContext();

	useEffect(()=>{
		set_title(value);
	},[cancel_trigger])

	return (
		<>
			<div className = {`flex justify-center align-middle `}>
				<input
					placeholder = {!form_error?"Title":"⚠️ Title is required"}

					disabled	= {!edit}
					className   = {`
						w-full
						caret-gray-500
						p-[0.5rem]
						pt-[0px]
						text-[1.5rem]
						${completed && !nocheck?"bg-gray-200":"bg-white"}
						${form_error?"placeholder:text-red-300":""}
						`}

					value={title}
					onChange    = {(e)=>{
						set_title(e.target.value)
					}}
				/>
				<div className = {`${nocheck?"hidden":"flex"} h-full border-gray-500 `}>
					{ !completed && <MdPending     onClick={()=>{set_completed(true) ;task.completed = true; set_task(task, task_array, set_task_array) }} className = {`cursor-pointer text-[2rem] text-yellow-500 mt-[0.5rem]`}/>}
					{ completed  && <MdCheckCircle onClick={()=>{set_completed(false);task.completed = false; set_task(task, task_array, set_task_array) }} className = {`cursor-pointer text-[2rem] text-green-500 mt-[0.5rem]`}/> }
				</div>
			</div>
			<hr />
		</>
	)
}
