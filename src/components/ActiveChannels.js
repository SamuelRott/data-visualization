import React  from "react";
import debounce from "lodash/debounce";
import map from "lodash/map";

class ActiveChannels extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastActiveDay: null
		}
	}



	// wait 1 seconde after last key stroke before fetching api
	// use lodash debounce function
	waitForFetch = debounce((lastActiveDay) => {
		this.getApi(lastActiveDay);
	}, 300)

	// fetch api with the input value as query value, return an array of radio4000 channels
	getApi = (lastActiveDay) => {
		return fetch(`https://api.radio4000.com/v1/channels?created.gt=1`)
			.then(res => res.json())
			.then(console.log)
	}

	calculateDate = () => {
		const now = Date.now();
		const thirtyDays = 2592000000;
		const lastActiveDay = now - thirtyDays;
		this.waitForFetch(lastActiveDay)
	}

	componentDidMount() {
		this.calculateDate();
	}

	render() {


		return (

			<div>
			  hello
			</div>


		);
	}
}


export default ( ActiveChannels );
