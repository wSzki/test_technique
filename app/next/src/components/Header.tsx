import {useTaskContext}  from '@/contexts/TaskContext';
import {SiTask}          from 'react-icons/si'
import {MdAssignmentAdd} from 'react-icons/md'
import { useEffect } from 'react';

// =============================================================================
// The header has a button which triggers the popup to add new tasks
// Using a context to pass the onClick event to the children
// =============================================================================

export default function Header () {
	const {popup, set_popup, search, set_search, task_array, set_no_search_results} = useTaskContext();


	useEffect(()=>{
		if (search.length) {
			const filteredTasks = task_array.filter((task) => {
				const titleMatch = task.title.toLowerCase().includes(search.toLowerCase());
				const descriptionMatch = task.description.toLowerCase().includes(search.toLowerCase());
				return titleMatch || descriptionMatch;
			});
			if (filteredTasks.length > 0) {
				set_no_search_results(false)
				return ;
			}
		}
		set_no_search_results(true)

	},[search])

	return (
		<div className = {`
			flex
			justify-between
			p-[1rem]
			bg-[#191d20]
			text-white
			`}>
			<SiTask className = {`text-[30px]`}/>

			<div className = {`flex`}>
				<input placeholder="Search" onChange={(e:any)=>{set_search(e.target.value)}} className = {`rounded-lg mr-[1rem] pl-[1rem] text-black`}/>
				<MdAssignmentAdd onClick={()=>{set_popup(!popup)}} className = {`text-[25px] h-full`}/>
			</div>
		</div>
	)
}
