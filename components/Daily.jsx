import { CaretDoubleUp, GearSix, PencilSimpleLine, ChatCircleDots } from '@phosphor-icons/react'

export default function Daily(props){
	return (
		<section className="bg-lite w-fill p-3 mt-16">
			<h1 className="flex items-center gap-1 text-xl font-medium">
				My goals
				<p className="text-gray text-base">per day</p>
				<GearSix weight="fill" className="w-6 h-6 ml-auto" />
			</h1>

			<div className="w-full flex flex-wrap gap-4 md:gap-0 items-center justify-around mt-4">
				<div className="flex items-center gap-1 m-3">
					<PencilSimpleLine weight="fill" className="w-6 h-6 fill-blue mt-1 mb-auto" />
					<h1 className="text-7xl">{props.metrics?.today.tweets || 0}</h1>
					<div className="mb-1 text-xl flex flex-col mt-auto">
						{props.metrics && props.metrics.today.tweets > 1 && <p className="text-blue font-medium flex items-center gap-1">
								<CaretDoubleUp weight="bold" className="w-4 h-4" />
								{props.metrics.today.tweets - 1}
							</p>
						}
						<p>/1 tweets</p>
					</div>
				</div>

				<div className="flex items-center gap-1 m-3">
					<ChatCircleDots weight="fill" className="w-6 h-6 fill-blue mt-1 mb-auto" />
					<h1 className="text-7xl">{props.metrics?.today.replies || 0}</h1>
					<div className="mb-1 text-xl flex flex-col mt-auto">
						{
							props.metrics && props.metrics.today.replies > 5 && <p className="text-blue font-medium flex items-center gap-1">
								<CaretDoubleUp weight="bold" className="w-4 h-4" />
								{props.metrics.today.replies - 5}
							</p>
						}
						<p>/5 replies</p>
					</div>
				</div>
			</div>
		</section>
	)
}