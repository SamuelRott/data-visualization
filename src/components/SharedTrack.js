import React  from 'react';
import * as d3 from 'd3';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import countBy from 'lodash/countBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import 'whatwg-fetch';

import serverConstants from 'src/constants/server';

class SharedTrack extends React.Component
{
		constructor(props)
		{
				super(props);
				this.state = {
					channels: null,
					channelsId: null
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

				// wait for all promises to be resolved
				return Promise.all(
						channelsId.map(channelId => {
							return this.getApiTracks(channelId)
					 })
				);
		}

		// fetch a channel/tracks
		getApiTracks(channelId)
		{

				return fetch(`${serverConstants.apiEndpoint}/channels/${channelId}/tracks`)
					.then(res => {
						if(!res.ok) {
							return []
						}
						return res.json()

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

		// remove all unique entry
		only_duplicates(tracks)
		{

				if (!tracks){
					return;
				}
			  var duplicateTracks = [];
			  while (tracks.length) {
				  var el = tracks.pop();
				  if (tracks.indexOf(el) >= 0 || duplicateTracks.indexOf(el) >= 0) duplicateTracks.push(el);
			  }
			  return duplicateTracks;
		}

		componentDidMount()
		{
				this.getApiChannels()
				.then(channels => {
						this.setState({
							channels
						})
						return this.transformChannelsData(channels)
				})
				.then( channelsId => this.fetchAllChannels(channelsId))
				.then( tracks => flatten(tracks))
				.then( tracks => this.transformTracksData(tracks))
				.then( ytdis => this.only_duplicates( ytdis ))
				.then( ytdis => countBy(ytdis, value => value ))
				.then( ytids => map( ytids, (value, key) => {
						return {
							ytid: key,
							amount: value
						}}
				))
				.then( ytids => sortBy(ytids, 'amount' ).reverse() )
				.then( ytids => console.log(ytids))
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
