
import { useEffect      } from 'react'
import { useCardContext } from '@/contexts/cardContext';

export default function InputDescription ({task, nocheck}:any) {
	let value = task ? task.description : "";

	const {
		cancel_trigger,
		edit,
		description,
		form_error,
		completed,
		set_description
	} = useCardContext();

		useEffect(()=>{
			set_description(value);
		},[cancel_trigger])

		return (
			<>
				<textarea
					placeholder = {!form_error?"Description":"⚠️ Description is required"}
					disabled	= {!edit}
					className   = {`
						caret-gray-500
						focus:outline-none
						min-h-[250px]
						p-[0.5rem]
						text-[1.2rem]
						${form_error && nocheck?"placeholder:text-red-300":""}
						${completed && !nocheck?"bg-gray-200":"bg-white"}
						`}

					value={description}
					onChange    = {(e)=>{
						set_description(e.target.value)
					}}
				/>
				<hr />
			</>
		);
}
