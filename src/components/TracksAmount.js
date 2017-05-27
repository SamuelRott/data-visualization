import React  from 'react';
import * as d3 from 'd3';
import take from 'lodash/take';
import sum from 'lodash/sum';
import 'whatwg-fetch';

import serverConstants from 'src/constants/server';

class TracksAmount extends React.Component {
	constructor(props) {
		super(props);
	}

	// return ammount of tracks per channel
	numberOfTracks = (channels) => {
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

	render() {
		const amountData = this.numberOfTracks(this.props.channels);

		return (

			<div>
				<h1>Currently {sum(amountData)} tracks on radio4000</h1>
			</div>

		);
	}
}

export default ( TracksAmount );
