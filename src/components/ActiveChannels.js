import React  from "react";
import debounce from "lodash/debounce";
import map from "lodash/map";
import filter from "lodash/filter";

class ActiveChannels extends React.Component {

	constructor(props) {
		super(props);
	}

	handleData = (channels) => {
		if (!channels){
			return;
		}
		return channels.map(channelValue => {
			// to filter empty channels and if its empty it cant be updated = 0 for timestamp
			if (!channelValue.tracks) {
				return {
					timestamp: 0,
					title: channelValue.title,
					tracks: 0
				}
			}
			// to filter out undefined timestamp
			else if (!channelValue.updated) {
				return {
					timestamp: 0,
					title: channelValue.title,
					tracks: channelValue.tracks.length
				}
			}
			return {
				timestamp: channelValue.updated,
				title: channelValue.title,
				tracks: channelValue.tracks.length
			}
		})
	}


	calculateDate = (channels) => {
		const timestamp = this.handleData(channels);
		const now = Date.now();
		const thirtyDays = 2592000000;
		const lastActiveDay = now - thirtyDays;
		const ActiveChannels = filter(timestamp, (channels) => {
			return channels.timestamp > lastActiveDay
		});
		console.log(ActiveChannels);
	}

	componentDidMount() {
	}

	render() {
		this.calculateDate(this.props.channels);

		return (

			<div>
			  hello
			</div>


		);
	}
}


export default ( ActiveChannels );
