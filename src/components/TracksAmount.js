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
				this.state = {
					tracks: null
				}
		}

		// fetch all channels
		getApi()
		{
			return fetch(`${serverConstants.apiEndpoint}/channels`)
				.then(res => res.json())
		}

		// return ammount of tracks per channel
		numberOfTracks(channels)
		{
			if (!channels){
				return;
			}
			return channels.map(channelValue => {
				if (!channelValue.tracks){
					return 0;
				}
				return channelValue.tracks.length;
			})
		}


		componentDidMount()
		{

				this.getApi().then(channels => {
					this.setState({
						tracks: this.numberOfTracks(channels)
					});
				})
				.catch();
		}


		render()
		{

				return (

					<div>
						<h1>Currently {sum(this.state.tracks)} tracks on radio4000</h1>
					</div>

				);
		}

}

export default ( SvgBarChart )
