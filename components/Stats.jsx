import React from "react";
import { PencilSimpleLine, ChatCircleDots } from '@phosphor-icons/react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

function Chart(props) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		responsive: true,
		elements: {
			point: {
				display: false,
				pointHitRadius: 6,
				radius: 0,
				hoverBorderWidth: 0,
				hoverRadius: 0,
			},
		},
		plugins: {
			tooltip: {
				xAlign: "center",
				yAlign: "bottom",
				displayColors: false,
				callbacks: {
					label: function (context) {
						return context.raw + " views";
					},
				},
			},
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
				ticks: {
					color: "#000",
					padding: 24,
				},
			},
			y: {
				grid: {
					color: "#E5E7EB",
				},
				border: {
					display: false,
				},
				ticks: {
					color: "#000",
					padding: 24,
					stepSize: 1,
				},
				max: props.max,
				min: 0,
			},
		},
	};

	const labels = props.dates;

	const data = {
		labels,
		datasets: [
			{
				label: props.title,
				data: props.data,
				borderColor: "#1DA1F2",
				backgroundColor: "#F9FAFB",
			},
		],
	};

	return (
		<div className="bg-lite w-full p-3 flex flex-col items-center gap-3">
			<h1 className="text-2xl w-full ml-6 flex items-center gap-2 tracking-wider">
				{
					props.title === 'Tweets' ?
					<PencilSimpleLine weight="fill" className="text-blue" />
					:
					<ChatCircleDots weight="fill" className="text-blue" />
				}
				{props.title}
			</h1>
			<Line options={options} data={data} />
		</div>
	);
}

export default function Stats(props) {

	return (
		<section className="my-6 flex flex-col items-center gap-12 mt-24">
			<div className="w-full flex items-center gap-6">
				<h1 className="text-4xl">Stats</h1>
				<p className="text-gray ml-auto">last 7 days data</p>
			</div>

			<Chart
				title="Tweets"
				data={[...(props.metrics?.daysTweeted || [])]}
				dates={[...(props.metrics?.dates || [])]}
				max={props.metrics?.maxTweeted + 1 || 0}
			/>
			<Chart
				title="Replies"
				data={[...(props.metrics?.daysReplied || [])]}
				dates={[...(props.metrics?.dates || [])]}
				max={props.metrics?.maxReplied + 1 || 0}
			/>
		</section>
	);
}
