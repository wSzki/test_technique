import {useTaskContext} from '@/contexts/TaskContext'
import {useEffect} from 'react'


export default function PopupSaveSuccess ({children}:any) {
	const {save_success, set_save_success} = useTaskContext();

	useEffect(() => {
		const timer = setTimeout(() => {
			set_save_success(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [save_success, set_save_success]);

	return (
		<>
			<div className = {`${save_success?"flex":"hidden"} bg-green-500 text-white p-4 rounded absolute bottom-[75px] left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
				Task Saved Successfully
			</div>
		</>
	)
}
