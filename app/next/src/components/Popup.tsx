import { useEffect, useState } from 'react'
import { useTaskContext } from '@/contexts/TaskContext'
import Task from '@/classes/Task';
import {PopupCard} from '@/components/Card';

export default function Popup ({children}:any) {
	const [title,       set_title]       = useState("");
	const [description, set_description] = useState("");
	const [form_error,  set_form_error]  = useState(false);
	const {
		popup,                set_popup,
		task_array,           set_task_array,
		task_component_array, set_task_component_array
	} = useTaskContext();

	useEffect(()=>{
		if (!popup)
			set_form_error(false);
	}, [popup]);

	if (popup)
		return (
			<div className = {`flex fixed flex-col   z-[999] bg-opacity-80 h-[calc(100%-113px)]  justify-center bg-gray-100 w-full`}>
				<div className = {`ml-[25%] mr-25%]`}>
					<PopupCard/>
				</div>
			</div>
		)
}

