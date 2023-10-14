import {useTaskContext} from '@/contexts/TaskContext'
import {useEffect} from 'react'


export default function PopupNoSearchResult ({children}:any) {
	const {search_result_found} = useTaskContext();

	return (
		<>
			<div className = {`${search_result_found?"hidden":"flex"} bg-yellow-500 p-4 rounded absolute justify-center top-[20vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
				No search result
			</div>
		</>
	)
}
