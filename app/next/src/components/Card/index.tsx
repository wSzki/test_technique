
import { CardContextProvider } from '@/contexts/cardContext';
import {Button}                from '@/components/Button'
import InputTitle              from './InputTitle'
import InputDescription        from './InputDescription';
import { useCardContext } from '@/contexts/cardContext';


function CardFrame ({children}:any) {
	const {completed} = useCardContext();
	return (
		<div className = {` ${completed?"bg-gray-200 text-gray-400":"bg-white"}  flex m-[1rem] rounded-xl shadow-lg border-gray-200 border-[1px] flex-col p-[0.5rem] `}>
			{children}
		</div>
	)
}

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
			<CardFrame>
				<InputTitle       task={task} />
				<InputDescription task={task} />
				<CardButtons/>
			</CardFrame>
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
				<InputTitle nocheck task={task}     />
				<InputDescription nocheck task={task} />
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

