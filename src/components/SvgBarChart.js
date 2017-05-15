import React  from 'react';
import * as d3 from 'd3';
import 'whatwg-fetch';

import serverConstants from 'src/constants/server';

class SvgBarChart extends React.Component
{
	constructor(props)
	{
			super(props);
			this.state = {
				channels: null,
				d3Data: null
			}
	}

	getApi()
	{
		return fetch(`${serverConstants.apiEndpoint}/channels`)
			.then(res => res.json())
	}

	transformChannelsData(channels)
	{
			if (!channels){
				return;
			}
			return channels.map(channel => {
				if (!channel.tracks){
					return {
						value: 0,
						title: channel.title
					};
				}
				return {
					value: channel.tracks.length,
					title: channel.title
				}
			})

	}



	displaySvgBarChart()
	{
			const min = d3.min(this.state.d3Data, x => x.value);
			const max = d3.max(this.state.d3Data, x => x.value);
			const width = window.innerWidth-200;
			const barHeight = 25;

			const r4Data = this.state.d3Data.sort(function (a, b) {return a.value - b.value;}).reverse();

			const scale = d3.scaleLinear()
				.domain([min, max])
				.range([0, width]);

			const chart = d3.select(this.chart)
		    .attr("width", width)
		    .attr("height", barHeight * this.state.d3Data.length);

			const bar = chart.selectAll("g")
		    .data(r4Data)
				.enter()
						.append("g")
	    			.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append("rect")
		    .attr("width", x => scale(x.value))
		    .attr("height", barHeight - 1);

			bar.append("text")
		    .attr("x", 0)
		    .attr("y", barHeight / 2)
		    .attr("dy", ".35em")
		    .text((x) => `${x.value} - ${x.title}`);

	}

	componentDidMount()
	{

			this.getApi().then(channels => {
				this.setState({
					channels,
					d3Data: this.transformChannelsData(channels)
				});
				this.displaySvgBarChart();
			})
			.catch();


	}


	render()
	{


			return (

				<div>
					<h1>Svg bar-chart</h1>
					<svg className="SvgBarChart" ref={(r) => this.chart = r}></svg>
				</div>

			);
	}

}

export default ( SvgBarChart )
