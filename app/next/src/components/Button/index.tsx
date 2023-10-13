import Task from '@/classes/Task';
import { useTaskContext } from '@/contexts/TaskContext'
import {useCardContext} from '@/contexts/cardContext';
import { CardContextProvider } from '@/contexts/cardContext';
import { set_task } from '@/classes/Task';
import BaseButton from './components/BaseButton';




export function Button({task, save, remove, cancel, modify }:any) {
	const {
		edit,
		set_edit,
		title,
		set_form_error,
		description,
		cancel_trigger,
		set_cancel_trigger
	} = useCardContext();

	const {
		popup,                set_popup,
		task_array,           set_task_array,
		task_component_array, set_task_component_array,
		save_trigger,         set_save_trigger
	} = useTaskContext();



	function validate_form (title:string, description:string) {
		if (!title.length)
			return false;
		if (!description.length)
			return false;
		return true;
	}

	function edit_task () {
		if (!task) return false;
		task.title       = title;
		task.description = description;
		set_task(task, task_array);
		return true;
	}

	function create_task () {
		const penultimate_task = task_array[task_array.length - 1];
		const new_task_id      = penultimate_task ? (penultimate_task.identifier + 1) : 1;
		const new_task         = new Task(new_task_id);

		new_task.title       = title;
		new_task.description = description;
		new_task.set_task();
		alert(2);
	}

	if (save) {
		return (
			<BaseButton
				textwhite
				color     = "bg-green-500"
				value     = "Save"
				onClick   =  {()=>{
					set_form_error(false);
					if (validate_form(title, description) === false)
						return set_form_error(true) ;
					edit_task() || create_task()
					set_popup(false);
					set_edit(false)
					set_save_trigger(!save_trigger)
				}}/>
		)
	}


	if (remove) {
		return (
			<BaseButton
				textwhite
				color     = "bg-red-500"
				value     = "Delete"
				onClick   =  {()=>{
					set_form_error(false);
					if (validate_form(title, description) === false)
						return set_form_error(true) ;

					const penultimate_task = task_array[task_array.length - 1];
					const new_task_id      = penultimate_task ? (penultimate_task.identifier + 1) : 1;
					const new_task         = new Task(new_task_id);

					new_task.title       = title;
					new_task.description = description;

					new_task.set_task();
					set_popup(false);
				}}/>
		)
	}

	if (modify) {
		return (
			<BaseButton
				invert
				color     = "bg-gray-300"
				value     = "Edit"
				onClick={()=>{
					set_edit(true)
					set_save_trigger(!save_trigger)
				}}
			/>
		)
	}
	if (cancel) {
		return (
			<BaseButton
				color     = "bg-yellow-400"
				value     = "Cancel"
				onClick={()=>{
					set_edit(false)
					set_cancel_trigger(!cancel_trigger)
					set_popup(false);
					console.log(111);
				}}
			/>
		)
	}
}

