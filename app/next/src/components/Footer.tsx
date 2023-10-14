
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
			<div className = {`font-mono pt-[4px]`}>
				6vhyzx8j@wsz.anonaddy.com
			</div>
			<AiFillGithub className = {`text-[30px]`}/>
		</div>
	)
}


