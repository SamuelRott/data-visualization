import React  from 'react';
import * as d3 from 'd3';
import 'whatwg-fetch';

import serverConstants from 'src/constants/server';

class SharedTrack extends React.Component
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
				console.log(channels);
				if (!channels){
					return;
				}
				return channels.map(channel => {
					// if (!channel.tracks){
					// 	return {
					// 		value: 0,
					// 		title: channel.title
					// 	};
					// }
					// return {
					// 	value: channel.tracks.length,
					// 	title: channel.title
					// }
				})

		}

		// 1.fetch all channels
		// 2.iterate each element and
		//    get tracks list
		//    store it
		// 2.compact all tracks list in 1 array https://lodash.com/docs/4.17.4#compact
		// 3.remove all unique string https://lodash.com/docs/4.17.4#xor
		// 3.find the most frequent id
		// 		store it
		// 		remove it from the array https://lodash.com/docs/4.17.4#pull
		// 		repeat strep 3
		//


		componentDidMount()
		{

				this.getApi().then(channels => {
						this.setState({
							channels,
							d3Data: this.transformChannelsData(channels)
						});
				})
				.catch();

		}

		render()
		{


			return (

				<div>
				  <h1>SharedTrack</h1>

				</div>

			);
		}
}


export default ( SharedTrack );
