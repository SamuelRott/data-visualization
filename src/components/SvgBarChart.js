import React  from 'react';
import * as d3 from 'd3';
import take from 'lodash/take';
import sum from 'lodash/sum';
import 'whatwg-fetch';

import serverConstants from 'src/constants/server';

class SvgBarChart extends React.Component
{
	constructor(props)
	{
			super(props);

	}


	// return array of objects
	transformChannelsData(channels)
	{

			if (!channels){
				return;
			}
			return channels.map(channel => {
				if (!channel.tracks){
					return {
						value: 0,
						slug: channel.slug,
						title: channel.title
					};
				}
				return {
					value: channel.tracks.length,
					slug: channel.slug,
					title: channel.title
				}
			})

	}

	displaySvgBarChart(d3Data)
	{

			if (!d3Data){
				return;
			}
			
			const min = d3.min(d3Data, x => x.value);
			const max = d3.max(d3Data, x => x.value);
			const width = window.innerWidth;
			const barHeight = 25;

			// sort data to have a descending effect
			const r4Data = d3Data.sort(function (a, b) {return a.value - b.value;}).reverse();

			// Take first 50 channels for display purpose
			const n = 50;
			const firstsNChannels = take(r4Data, n);

			const scale = d3.scaleLinear()
				.domain([min, max])
				.range([0, width-200]);

			const chart = d3.select(this.chart)
		    .attr("width", width-50)
		    .attr("height", barHeight * firstsNChannels.length);

			const bar = chart.selectAll("g")
		    .data(firstsNChannels)
				.enter()
						.append("g")
	    			.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append("rect")
		    .attr("width", x => scale(x.value))
		    .attr("height", barHeight - 1);


			bar.append("a")
						.attr("xlink:href", (x) => "https://radio4000.com/" + `${x.slug}`)
						.append("text")
						.attr("x", x => scale(x.value)+8)
						.attr("y", barHeight / 2)
						.attr("dy", ".35em")
						.text((x) => `${x.value} - ${x.title}`);

	}




	render()
	{
			const d3Data = this.transformChannelsData(this.props.channels);
			this.displaySvgBarChart(d3Data);


			return (

				<div>
					<h1>First 50 channels</h1>
					<br/>
					<svg className="SvgBarChart" ref={(r) => this.chart = r}></svg>
				</div>

			);
	}

}

export default ( SvgBarChart )
