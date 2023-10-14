import {useTaskContext}  from '@/contexts/TaskContext';
import {SiTask}          from 'react-icons/si'
import {MdAssignmentAdd} from 'react-icons/md'

// =============================================================================
// The header has a button which triggers the popup to add new tasks
// Using a context to pass the onClick event to the children
// =============================================================================

export default function Header () {
	const {popup, set_popup} = useTaskContext();
	return (
		<div className = {`
			flex
			justify-between
			p-[1rem]
			bg-[#191d20]
			text-white
			`}>
			<SiTask className = {`text-[30px]`}/>
			<MdAssignmentAdd onClick={()=>{set_popup(!popup)}} className = {`text-[25px] h-full`}/>
		</div>
	)
}
