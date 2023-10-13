
import { useEffect, useState } from 'react'
import { useTaskContext } from '@/contexts/TaskContext'
import Task from '@/classes/Task';
import {BiSolidErrorCircle} from 'react-icons/bi'
import { useCardContext } from '@/contexts/cardContext';
import { CardContextProvider } from '@/contexts/cardContext';
import { set_task } from '@/classes/Task';
import {Button} from '@/components/Button'



function Title ({task}:any) {
	const value = task ? task.title : "";
	const {cancel_trigger, edit, title,form_error, set_title} = useCardContext();

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

function Description ({task}:any) {
	let value = task ? task.description : "";
	const {cancel_trigger,edit, description, form_error, set_description} = useCardContext();
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



export default function Card ({task}:any) {


	return (
		<CardContextProvider task={task}>
			<div className = {`flex	m-[1rem] rounded-xl shadow-lg border-gray-200 border-[1px] flex-col bg-white p-[0.5rem]  w-[100%]`}>
				<Title  task={task}     />
				<Description task={task} />
				<div className = {`p-[0.5rem] justify-between flex  pt-[1rem]`}>

					<div>
						<Button remove/>
					</div>
					<div>
						<Button save task={task}/>
						<Button cancel/>
					</div>
					<Button modify/>
				</div>
			</div>
		</CardContextProvider>
	)
}

export function PopupCard ({task}:any) {

	return (
		<CardContextProvider task={task} invert_edit_logic>
			<div className = {`flex	m-[1rem] rounded-xl shadow-lg border-gray-200 border-[1px] flex-col bg-white p-[0.5rem] max-h-[50vh] w-[50vw]`}>
				<Title  task={task}     />
				<Description task={task} />
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

