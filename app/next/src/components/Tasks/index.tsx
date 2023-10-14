
import {useEffect}      from "react";
import {useState}       from "react";
import Task             from "@/classes/Task";
import Card             from "@/components/Card";
import {useTaskContext} from "@/contexts/TaskContext";

function TaskFactory () {
	const { save_trigger, task_array } = useTaskContext();
	const [TaskInputComponentArray, set_TaskInputComponentArray] = useState<any[]>([]);

	// =========================================================================
	// Rerendering all tasks on save
	// or on array length change
	// Save is trigger by the @/components/Button component, save variant
	// =========================================================================
	let key = 0;
	useEffect(() => {
		const array = task_array.map((task:Task) => {

			// =================================================================
			//  The <Card/> component handles the add/remove task functionality 
			//  If you're looking for the next step, this is it
			// =================================================================
			return <Card key={key++} task={task}/>

		})
		set_TaskInputComponentArray(array)
	}, [save_trigger, task_array.length])
	return TaskInputComponentArray;
}

// =============================================================================
// Splits an array in N different subarrays, for the masonry layout
// =============================================================================
function splitArray(array:Task[], splits:number) {
	const subarrays:any = [[], [], [], []];
	for (let i = 0; i < array.length; i++) {
		subarrays[i % splits].push(array[i]);
	}
	return subarrays;
}

export default function Tasks () {
	// =========================================================================
	//  This looks terrible but uses CSS mediaqueries instead of JS mediaqueries
	//  which might be better
	// =========================================================================
	const array = TaskFactory();

	const splitted_array1 = (splitArray(array, 1));
	const splitted_array2 = (splitArray(array, 2));
	const splitted_array3 = (splitArray(array, 3));
	const splitted_array4 = (splitArray(array, 4));

	let mason1 : any = []
	let mason2 : any = []
	let mason3 : any = []
	let mason4 : any = []

	for (let i = 0; i < 1; i++){mason1.push(<div key={i} className = {`hidden min-[0px]:max-[500px]:flex     flex-col`} style={{width:"98vw"}}>{splitted_array1[i]}</div>)}
	for (let i = 0; i < 2; i++){mason2.push(<div key={i} className = {`hidden min-[501px]:max-[900px]:flex   flex-col`} style={{width:"48vw"}}>{splitted_array2[i]}</div>)}
	for (let i = 0; i < 3; i++){mason3.push(<div key={i} className = {`hidden min-[901px]:max-[1300px]:flex  flex-col`} style={{width:"31vw"}}>{splitted_array3[i]}</div>)}
	for (let i = 0; i < 4; i++){mason4.push(<div key={i} className = {`hidden min-[1301px]:max-[3000px]:flex flex-col`} style={{width:"23vw"}}>{splitted_array4[i]}</div>)}

	return (
		<div className = {`flex w-full justify-center pb-[60px]`}>
			{mason1}
			{mason2}
			{mason3}
			{mason4}
		</div>
	)
}
