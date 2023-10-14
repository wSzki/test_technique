import { useCardContext } from '@/contexts/cardContext';
import { useEffect      } from 'react'

export default function Title ({task}:any) {
	const value = task ? task.title : "";
	const {
		cancel_trigger,
		edit,
		title,
		form_error,
		set_title
	} = useCardContext();

	useEffect(()=>{
		set_title(value);
	},[cancel_trigger])

	return (
		<>
			<input
				placeholder = {!form_error?"Title":"⚠️ Title is required"}

				disabled	= {!edit}
				className   = {`
					caret-gray-500
					p-[0.5rem]
					text-[2rem]
					${form_error?"placeholder:text-red-300":""}
					`}

				value={title}
				onChange    = {(e)=>{
					set_title(e.target.value)
				}}
			/>
			<hr />
		</>
	)
}
