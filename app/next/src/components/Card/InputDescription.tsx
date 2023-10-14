
import { useEffect      } from 'react'
import { useCardContext } from '@/contexts/cardContext';

export default function InputDescription ({task}:any) {
	let value = task ? task.description : "";

	const {
		cancel_trigger,
		edit,
		description,
		form_error,
		set_description} = useCardContext();

	useEffect(()=>{
		set_description(value);
	},[cancel_trigger])

	if (edit)
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
						text-[1.5rem]
						${form_error?"placeholder:text-red-300":""}
						`}

					value={description}
					onChange    = {(e)=>{
						set_description(e.target.value)
					}}
				/>
				<hr />
			</>
		);
		else
			return (
				<>
					<p className = {`
						caret-gray-500
						focus:outline-none
						min-h-[250px]
						p-[0.5rem]
						text-[1.5rem]
						whitespace-pre
						`}>
						{description}
					</p>
					<hr />
				</>
			);
}
