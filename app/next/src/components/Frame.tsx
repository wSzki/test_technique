
export default function Frame ({children}:any) {
	return (
		<div className=
			{`
				flex
				relative
				flex-col
				w-full
				h-full
				//align-middle
				//justify-center
				overflow-scroll
			`}>
			{children}
		</div>
	)
}
