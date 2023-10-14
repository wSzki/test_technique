
import { CardContextProvider } from '@/contexts/cardContext';
import {Button}                from '@/components/Button'
import InputTitle              from './InputTitle'
import InputDescription        from './InputDescription';

// =============================================================================
// This is the main card component, representing a task in the main window
// Some <Buttons/> trigger a rerender with a pseudo hook, using a togglable useState()
// dependency on useEffect in @/components/Tasks.tsx
// =============================================================================

export default function Card ({task}:any) {
	function CardButtons () {
		return (
			<div className = {`p-[0.5rem] justify-between flex  pt-[1rem]`}>
				{/* ==================================================== */}
				{/*  These are only visible when <Button modify/> is not */}
				{/* ==================================================== */}
				<Button remove task={task}/>
				<div>
					<Button save task={task}/>
					<Button cancel/>
				</div>
				{/* ==================================================== */}
				{/* ----- Only visible when other buttons are not ------ */}
				{/* ==================================================== */}
				<Button modify/>
			</div>
		)
	}
	return (
		<CardContextProvider task={task}>
			<div className = {`flex	m-[1rem] rounded-xl shadow-lg border-gray-200 border-[1px] flex-col bg-white p-[0.5rem] `}>
				<InputTitle       task={task} />
				<InputDescription task={task} />
				<CardButtons/>
			</div>
		</CardContextProvider>
	)
}

// =============================================================================
// Only used for the popup task form
// Duplicated the component <Card/> because the button logic is handled differently
// =============================================================================
export function PopupCard ({task}:any) {

	return (
		<CardContextProvider task={task} invert_edit_logic>
			<div className = {`flex	m-[1rem] rounded-xl shadow-lg border-gray-200 border-[1px] flex-col bg-white p-[0.5rem] max-h-[50vh] w-[50vw]`}>
				<InputTitle  task={task}     />
				<InputDescription task={task} />
				<div className = {`p-[0.5rem] justify-between flex  pt-[1rem]`}>
					<div/>
					<div>
						<Button save task={task}/>
						<Button cancel/>
					</div>
				</div>
			</div>
		</CardContextProvider>
	)
}

