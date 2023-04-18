import Image from 'next/image'

import { FlagBanner } from '@phosphor-icons/react'

export default function Header(props){

	return (
		<header className="flex items-center gap-3">
			<h1 className="text-4xl font-medium">Hot Score</h1>
			<FlagBanner weight="fill" size={36} className="fill-blue" />
			<button onClick={() => props.signout()} className="ml-auto mr-4 p-2 px-4 rounded bg-blue md:text-lg text-white cursor-pointer">
				Log out
			</button>
			<Image src={props.data?.user_metadata.avatar_url || ''} width={580} height={580} alt={"@" + (props.data?.user_metadata.user_name || 'mikasa')} className="w-12 h-12 rounded-full" />
		</header>
	)
}