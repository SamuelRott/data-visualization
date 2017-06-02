import React  from 'react';
// import BarChart from './components/BarChart';
import SvgBarChart from './components/SvgBarChart';
import SharedTrack from './components/SharedTrack';
import TracksAmount from './components/TracksAmount';
// import AutoComplete from './components/AutoComplete';
// import ActiveChannels from './components/ActiveChannels';


import serverConstants from './constants/server.js';

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          channels: null,
					tracks: null
				}
    }

    // fetch all channels
    getApi = () => {
      // return fetch(`${serverConstants.localChannels}`)
      return fetch(`${serverConstants.apiEndpoint}/channels`)
        .then(res => res.json())
    }

    componentDidMount() {
			this.getApi().then(channels => {
				this.setState({
        	channels
				});
			})
			.catch();
		}

    render()
    {
        return (
            <div className="Container">
              <SharedTrack/>
              <TracksAmount channels= {this.state.channels}/>
              <SvgBarChart channels= {this.state.channels}/>
            </div>
        );
    }
}


export default ( App );
