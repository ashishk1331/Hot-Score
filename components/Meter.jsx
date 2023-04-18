import { Flame } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'

export default function Meter(props){

	return (
		<section className="w-full flex flex-col items-center gap-8 my-12">

			<h1 className="text-7xl font-medium">{ props.user?.followerCount || 0 }</h1>
				
			<h2 className="flex items-center gap-1 text-xl">
				<Flame weight="fill" className="w-6 h-6 fill-blue" />
				hot score
			</h2>
			<div className="flex items-center justify-around w-full">
				<h1 className="flex items-baseline gap-3">
					growth <p className="text-4xl font-medium">{
						props.growth
					}%</p>
				</h1>
				<h1 className="flex items-baseline gap-3">
					streak <p className="text-4xl font-medium">{props.metrics?.streak || 0} days</p>
				</h1>
			</div>
		</section>
	)
}