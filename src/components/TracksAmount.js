import React  from 'react';
import sum from 'lodash/sum';
import 'whatwg-fetch';

class TracksAmount extends React.Component {

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
