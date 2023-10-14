
import { Inter } from 'next/font/google'
import type { AppProps               } from 'next/app';
import type { NextPage               } from 'next'
import type { ReactElement,ReactNode } from 'react'
import Head                            from 'next/head'

import '@/styles/globals.css'
import {TaskProvider} from '@/contexts/TaskContext'
import Header         from '@/components/Header';
import Footer         from '@/components/Footer';

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// NESTED LAYOUTS (NOT USED IN THIS APP)
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
		<main className={`
			flex
			flex-col
			fixed
			h-full
			w-full
			pb-[65px]
			z-[999]
			justify-between
			${inter.className}
			`}>

			<Head>
				<title>Task Manager - Powder</title>
				<meta name = "description" content = "Skill test completed by wsz" key = "desc" />
			</Head>

			<TaskProvider>
				<Header/>
				{getLayout(<Component {...pageProps} />)}
				<Footer/>
			</TaskProvider>

		</main>
	);
}


