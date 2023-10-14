import {useEffect}      from 'react'
import {useRouter}      from 'next/router';

import {useTaskContext} from '@/contexts/TaskContext'

import Frame            from '@/components/Frame'
import Popup            from '@/components/Popup'
import Tasks            from '@/components/Tasks'

// =============================================================================
// ----------------------------------- MAIN ------------------------------------
// =============================================================================

export default function Home() {

	// =========================================================================
	// Utility to clear localstorage with ?clear=1
	// Ignored in production - no other uses
	// =========================================================================
	const router = useRouter();
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production')
			if (router.query.clear == '1') localStorage.clear();
	}, [router.query]);

	// =========================================================================
	//  get_all_tasks() fetches data from localStorage.
	//  It isn't perticularly expensive, but considering that
	//  in a real application it would rather be a fetch request,
	//  it is only done once
	//  The data will be manipulated client side via the useState array
	//  `task_array` and copied to localstorage upon form validation
	// =========================================================================
	const {set_task_array} = useTaskContext();
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const tasks_from_localStorage = localStorage.getItem('Tasks') ?? "[]";
		set_task_array(JSON.parse(tasks_from_localStorage));
	}, []);

	return (
		<Frame>

			{/* ============================================================ */}
			{/* -- The main window that contains all the task components --- */}
			{/* ============================================================ */}
			<Tasks/>

			{/* ============================================================ */}
			{/* ------------- Popup form to generate new tasks ------------- */}
			{/* ============================================================ */}
			<Popup/>

		</Frame>
	)
}


