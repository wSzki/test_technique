import Task             from '@/classes/Task';
import {useTaskContext} from '@/contexts/TaskContext'
import {useCardContext} from '@/contexts/cardContext';
import {set_task}       from '@/classes/Task';
import BaseButton       from './components/BaseButton';

export function Button({task, save, remove, cancel, modify }:any) {

	const {
		set_edit,
		title,
		set_form_error,
		description,
		cancel_trigger,
		set_cancel_trigger
	} = useCardContext();

	const {
		set_popup,
		task_array,
		save_trigger,         set_save_trigger
	} = useTaskContext();

	// =========================================================================
	// These functions are shared between the <Button/> components
	// and were tricky to isolate
	// Focusing on other issues so leaving this here for now
	// =========================================================================

	function validate_form (title:string, description:string) {
		// =====================================================================
		// Triggers the error rerendering on empty form fields
		// =====================================================================
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
		// =====================================================================
		// Modifies the useState array and pushes to localStorage
		// =====================================================================
		set_task(task, task_array);
		return true;
	}

	function create_task () {
		const penultimate_task = task_array[task_array.length - 1];
		const new_task_id      = penultimate_task ? (penultimate_task.identifier + 1) : 1;
		const new_task         = new Task(new_task_id);

		new_task.title       = title;
		new_task.description = description;
		// =====================================================================
		//  The id does not exist in the array,
		//  so it will push a new Task to the end of the useState array
		//  then push to localStorage
		// =====================================================================
		set_task(new_task, task_array);
	}


	// =========================================================================
	// These are the variants of the Button component
	// =========================================================================

	if (save) {
		return (
			<BaseButton
				textwhite
				color     = "bg-green-500"
				value     = "Save"
				onClick   =  {()=>{
					set_form_error(false);
					if (validate_form(title, description) === false)
						return set_form_error(true);
					// =========================================================
					// If not possible to edit task, create one
					// =========================================================
					edit_task() || create_task()
					set_popup(false);
					set_edit(false)
					// =========================================================
					// Pseudo hook to trigger rerendering
					// =========================================================
					set_save_trigger(!save_trigger)
				}}
			/>
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

					// =========================================================
					//  Getting the last id in the array, and adding 1 to it
					//  The result will be used as the new task's identifier
					// =========================================================
					const penultimate_task = task_array[task_array.length - 1];
					const new_task_id      = penultimate_task ? (penultimate_task.identifier + 1) : 1;
					const new_task         = new Task(new_task_id);

					new_task.title       = title;
					new_task.description = description;

					// =========================================================
					// set_task pushes to the array if task is not found
					// =========================================================
					set_task(new_task, task_array);
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
					// =========================================================
					//  Switching to edit mode on a single card
					//  Enables textarea, and shows additional buttons
					// =========================================================
					set_edit(true)

					// =========================================================
					// Pseudo hook to trigger rerendering
					// =========================================================
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
					// =========================================================
					//  Switching to edit mode on a single card
					//  Enables textarea, and shows additional buttons
					// =========================================================
					set_edit(false)

					// =========================================================
					// Pseudo hook to rerender the card
					// =========================================================
					set_cancel_trigger(!cancel_trigger)

					// =========================================================
					// Closing Popup
					// =========================================================
					set_popup(false);
				}}
			/>
		)
	}
}

