
import Link from 'next/link'
import {AiFillGithub} from 'react-icons/ai'

export default function Footer ({children}:any) {
	return (
		<div className = {`
			flex
			justify-between
			fixed
			bottom-0
			w-screen
			p-[1rem]
			bg-[#191d20]
			text-white
			`}>
			<Link href = {`mailto:6vhyzx8j@wsz.anonaddy.com`} target="_blank">
				<div className = {`font-mono pt-[4px]`}>
					6vhyzx8j@wsz.anonaddy.com
				</div>
			</Link>
			<Link href = {`https://github.com/wSzki/test_technique/`} target="_blank">
				<AiFillGithub className = {`text-[30px]`}/>
			</Link>
		</div>
	)
}


