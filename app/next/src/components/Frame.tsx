


export default function Frame ({children}:any) {
	return (
		<div className=
			{`
				flex
				flex-col
				w-full
				h-full
				align-middle
				justify-center
				overflow-scroll
			`}>
			{children}
		</div>
	)
}
