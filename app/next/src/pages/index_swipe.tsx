import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import {AiFillCloseCircle} from 'react-icons/ai'

import {AiFillCheckCircle} from 'react-icons/ai'
import {useEffect, useState} from 'react'

//import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

//import { EffectCoverflow, Pagination, Mousewheel, FreeMode} from 'swiper/modules';





function INPUT ({index, median_task_index, hidden}:any) {
	return (
		<div className = {`${hidden?"opacity-0":""} flex rounded-lg justify-between m-[5px] p-[10px] ${index === median_task_index ? "bg-green-100" : "bg-gray-100"}`}>
			<div>
				<input placeholder='Title' type="text" className = {`bg-gray-100 focus:outline-0 enabled:hover:border-gray-400  border-b-2 border-b-black p-[5px]`} />
				<input placeholder='Description' type="text" className = {`bg-gray-100 focus:outline-0 enabled:hover:border-gray-400  border-b-2 border-b-black p-[5px]`} />
			</div>
			<div className = {`flex`}>
				<AiFillCloseCircle className = {`h-full text-[30px]`}color="red"/>
				<AiFillCheckCircle className = {`h-full text-[30px]`}color="green"/>
			</div>
		</div>

	)
}


//function SWIPER ({children}:any) {
//return (
//<>
//<Swiper
//mousewheel={true}
//className = {`flex  w-[500px] h-screen`}
//freeMode={true}

////grabCursor={true}
//pagination={true}

//modules={[EffectCoverflow, Mousewheel]}

//effect={'coverflow'}
//centeredSlides={true}
//loop={true}
//slidesPerView={10}
//coverflowEffect={{
//rotate: 0,
//stretch: 1,
//scale : 1,
//depth: 100,
//modifier: 1,
//slideShadows: false,
//}}



//spaceBetween={0}
//direction='vertical'
//onSlideChange={() => console.log('slide change')}
//onSwiper={(swiper) => console.log(swiper)}
//>
//</Swiper>
//</>
//)

function get_all_tasks() : Task[] {
	const tasks      = localStorage.getItem('Tasks') ?? "";
	const task_array = JSON.parse(tasks)
	return (task_array)
}

class Task {
	title       : string;
	description : string;
	completed   : boolean;
	createdAt   : Date;
	identifier  : number;

	constructor(identifier:number) {
		if (!identifier)    throw new Error("Identifier must be set");
		if (identifier < 0) throw new Error("Identifier must be positive");
		this.title       = "";
		this.description = "";
		this.completed   = false;
		this.createdAt   = new Date();
		this.identifier  = identifier;
	}

	task_in_array() : Task | undefined {
		// =====================================================================
		// Returns a Task if it exists the array
		// =====================================================================
		let tasks = get_all_tasks();
		let found_task = tasks.find((task:Task) => task.identifier === this.identifier);
		return found_task;
	}

	get_task() : Task {
		return this
	}

	set_task() {
		const tasks      = get_all_tasks();
		let   found_task = this.task_in_array();

		// =====================================================================
		// If the task exists, modify it; else push it to the end of th earray
		// =====================================================================
		if (found_task) {
			found_task = this;
			localStorage.setItem('Tasks', JSON.stringify(tasks))
		}

		else {
			tasks.push(this)
			localStorage.setItem('Tasks', JSON.stringify(tasks))
		}
	}
}

class Tasks {
}

function Input ({children}:any) {

	const [task, set_task] = useState(new Task(1));

	return (
		<>
			<div className = {`p-[1rem] bg-red-100`}>
				<button onClick={()=>{task.set_task()}}>
					POST
				</button>
				<button onClick={()=>{console.log(task.get_task())}}>
					GET
				</button>

				<input placeholder="Title" onChange={(e)=>{
					task.title = e.target.value;
					task.set_task();
				}}/>
			</div>
		</>
	)
}
function localstorage_clear({children}:any) {
	localStorage.clear();
}

export default function Home() {

	useEffect(() => {
		// Check if we're on the client-side
		if (typeof window !== 'undefined') {
			// Now you can safely use localStorage
			let myData1 = localStorage.getItem('myData');
			console.log('Data from localStorage:', myData1);
		}
	}, []);

	//console.log('Score:', score); // Output: Score: 100




	//let username = localStorage.getItem('username');
	//let score = localStorage.getItem('score');

	//console.log('Username:', username); // Output: Username: john_doe
	//console.log('Score:', score); // Output: Score: 100

	const [current_task, set_current_task] = useState(0);
	const [task_array, set_task_array] = useState([]);


	let stored_tasks_count = 0

	useEffect(() => {
		let arr:any = [];
		let key = 0;
		while (key++ < stored_tasks_count){
			arr.push(
				//<SwiperSlide key={key} className = {`flex h-[20px]`}>
					<INPUT index={key} key={key}/>
					//</SwiperSlide>
			)
		}
		set_task_array(arr)
	}, [])

	useEffect(() => {
		set_current_task(task_array.length / 5)
	}, [task_array.length])



	return (
		<Frame>
			<div className = {`flex flex-col overflow-scroll  `}>
				{task_array}

				<Input/>

				<Tmp/>
			</div>
		</Frame>
	)
}


// =============================================================================
// -------------------------------- Components ---------------------------------
// =============================================================================

const Frame = ({children}:any) => <div className={`flex flex-col w-full align-middle justify-center overflow-scroll`}>{children}</div>
const Tmp = ({}:any) => <div className = {`p-[1rem] bg-[#191d20] text-white`}>Footer</div>


