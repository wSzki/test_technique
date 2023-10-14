
import {useCardContext} from '@/contexts/cardContext';

const common_button_styles = " rounded-md shadow-lg w-[4rem]  text-[white] p-[5px]"

export default function BaseButton ({color, textwhite, value, onClick, invert, padding}:any) {
	const {edit} = useCardContext();
	if (!invert) {
		return (
			<button
				onClick   = {onClick}
				className = {`
					${edit===false?"hidden":""}
					${textwhite?"text-white":"text-black"}
					${common_button_styles}
					${color}
					${padding? "ml-[5px]":""}
					`}>
				{value}
			</button>
		)
	}
	else {
		return (
			<button
				onClick   = {onClick}
				className = {`
					${edit===false?"":"hidden"}
					${textwhite?"text-white":"text-black"}
					${common_button_styles}
					${color}
					`}>
				{value}
			</button>
		)
	}
}
