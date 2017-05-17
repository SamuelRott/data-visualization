import React  from 'react';
import * as d3 from 'd3';
import compact from 'lodash/compact';
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

		// fetch all channels
		getApiChannels()
		{
				return fetch(`${serverConstants.apiEndpoint}/channels`)
					.then(res => res.json())
		}

		// return [channelsId]
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

		// loop [channelsId] fetch a channel/tracks
		fetchAllChannels(channelsId)
		{

				if (!channelsId){
					return;
				}
				return channelsId.map(channelId => {
					this.getApiTracks(channelId)
				})
		}

		// fetch a channel/tracks merge then in one array
		getApiTracks(channelId)
		{
				// radio with tracks
				// return fetch(`${serverConstants.apiEndpoint}/channels/-J_Gj6nryBGVLHrmfZ10/tracks`)
				// radio without tracks
				// return fetch(`${serverConstants.apiEndpoint}/channels/-KbLsrdpcPPkGHzXyVBX/tracks`)
				return fetch(`${serverConstants.apiEndpoint}/channels/${channelId}/tracks`)
					.then(res => res.json())
					.then(tracks => {
						this.setState({
							// tracks: [...this.state.tracks, ...this.transformTracksData(tracks)]
							tracks: this.transformTracksData(tracks)
						})
					})
		}

		// return [ytids]
		transformTracksData(tracks)
		{
				if (!tracks){
					return;
				}
				return tracks.map(track => {
					if (!track.ytid){
						return;
					}
					return track.ytid;
				})
		}

		componentDidMount()
		{
				this.getApiChannels().then(channels => {
						this.setState({
							channels,
							channelsId: this.transformChannelsData(channels)
						})
						this.fetchAllChannels(this.state.channelsId)
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
