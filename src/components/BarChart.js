import React  from 'react';
import * as d3 from 'd3';
import 'whatwg-fetch';

import serverConstants from 'src/constants/server';

class BarChart extends React.Component
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

		displayBarChart()
		{
				const min = d3.min(this.state.d3Data, x => x.value);
				const max = d3.max(this.state.d3Data, x => x.value);

				const r4Data = this.state.d3Data.sort(function (a, b) {return a.value - b.value;}).reverse();

				const scale = d3.scaleLinear()
					.domain([min, max])
					.range([min, window.innerWidth-100]);

				const p = d3.select(this.chart).selectAll("div")
					.data(r4Data);

				p.enter()
					.append("div")
						.attr("class", "bar-chart")
						.transition()
						.duration(1000)
						.style("width", x => scale(x.value) + "px")
						.text((x) => `${x.title} - ${x.value}`);

				p.exit()
					.remove();

		}

		componentDidMount()
		{

				this.getApi().then(channels => {
					this.setState({
						channels,
						d3Data: this.transformChannelsData(channels)
					});
					this.displayBarChart();
				})
				.catch();

		}

		render()
		{


			return (

				<div>
				  <h1>Div bar-chart</h1>
					<div ref={(r) => this.chart = r}></div>

				</div>

			);
		}
}


export default ( BarChart );
