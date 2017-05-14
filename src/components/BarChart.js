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
						return 0;
					}
					return channel.tracks.length
				})
		}

		displayBarChart()
		{
				const min = d3.min(this.state.d3Data);
				const max = d3.max(this.state.d3Data);

				console.log(max);
				const scale = d3.scaleLinear()
					.domain([0, max])
					.range([0, window.innerWidth-100]);

				const p = d3.select(this.chart).selectAll("div")
					.data(this.state.d3Data)
					.text(d => {
						return d;
					});

				p.enter()
					.append("div")
						.attr("class", "bar-chart--div")
						.transition()
						.duration(1000)
						.style("width", d => scale(d) + "px")
						.text(d => d);

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
				  <h1>lol</h1>
					<div ref={(r) => this.chart = r}></div>

				</div>

			);
		}
}


export default ( BarChart );
