
import {useTaskContext} from '@/contexts/TaskContext'
import {PopupCard}      from '@/components/Card';

export default function Popup () {
	const {popup} = useTaskContext();

	if (popup)
		return (
			<div className = {`
				flex
				fixed
				flex-col
				z-[999]
				bg-opacity-80
				h-[calc(100%-125px)]
				justify-center
				bg-gray-100
				w-full
				`}>
				<div className = {`ml-[25%] mr-25%]`}>
					<PopupCard/>
				</div>
			</div>
		)
}

