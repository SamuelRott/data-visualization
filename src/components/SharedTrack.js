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
					channelsId: null,
					ytids: null
				}
		}

		getApiChannels()
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
					if (!channel.id){
						return;
					}
					return channel.id;
				})

		}

		getApiTracks(channelId)
		{
			return fetch(`${serverConstants.apiEndpoint}/channels/${channelId}/tracks`)
				.then(res => res.json())
		}

		transformChannelsIdData(channelsId)
		{
				console.log(channelsId);
				if (!channelsId){
					return;
				}
				// 4. loop array fetch https://api.radio4000.com/v1/channels/ channel.id / tracks
				return channelsId.map(channelId => {
					this.getApiTracks(channelId)
				})
		}

		// 1. fetch all channel https://api.radio4000.com/v1/channels
		// 2. get all channel.id
		// 3. store the ids in an array
		// 5. get all track.ytid
		// 6. store the ytids in an array
		// 7. remove all unique entry
		// 8. compare the rest to find most frequetnt entry, store it, remove it, repeat.



		componentDidMount()
		{
				this.getApiChannels().then(channels => {
						this.setState({
							channels,
							channelsId: this.transformChannelsData(channels),
						});
						// console.log();
						this.transformChannelsIdData(this.state.channelsId);
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
