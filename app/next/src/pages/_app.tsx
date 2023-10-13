
import { Inter } from 'next/font/google'
import type { AppProps               } from 'next/app';
import type { NextPage               } from 'next'
import type { ReactElement,ReactNode } from 'react'

import '@/styles/globals.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import {MdAssignmentAdd} from 'react-icons/md'
import { TaskProvider } from '@/contexts/TaskContext'
import { useTaskContext } from '@/contexts/TaskContext';


function Header ({children}:any) {
	const { popup, set_popup, task_array, set_task_array, task_component_array, set_task_component_array } = useTaskContext();
	return (
		<div className = {`flex justify-between p-[1rem] bg-[#191d20] text-white`}>
			Header
			<MdAssignmentAdd onClick={()=>{set_popup(!popup)}} className = {`text-[25px] h-full`}/>
		</div>
	)
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// NESTED LAYOUTS
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout; }

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// MAIN
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const inter = Inter({ subsets: ['latin'] })
export default function MyApp({ Component, pageProps }: AppPropsWithLayout ) {
	const getLayout  = Component.getLayout ?? ((page) => page)
	return (
		<main className={`flex flex-col fixed h-full w-full z-[999] justify-between bg-[var(--primary)]  ${inter.className}`}>


			<TaskProvider>
				<Header/>
				{getLayout(<Component {...pageProps} />)}
			</TaskProvider>


			<div className = {`fixed bottom-0 w-screen p-[1rem] bg-[#191d20] text-white`}>Footer</div>
		</main>
	);
}


