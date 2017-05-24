import React  from 'react';
import styled from 'styled-components';

import BarChart from 'src/components/BarChart';
import SvgBarChart from 'src/components/SvgBarChart';
// import SharedTrack from 'src/components/SharedTrack';
import TracksAmount from 'src/components/TracksAmount';
import AutoComplete from 'src/components/AutoComplete';


import serverConstants from 'src/constants/server';

const Container = styled.div`
    color: #fff;
`;

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
          channels: null,
					tracks: null
				}
    }

    // fetch all channels
    getApi()
    {
      return fetch(`${serverConstants.apiEndpoint}/channels`)
        .then(res => res.json())
    }

    componentDidMount()
		{

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
            <Container>
              <AutoComplete />
              <TracksAmount channels= {this.state.channels}/>
              <SvgBarChart channels= {this.state.channels}/>
            </Container>
        );
    }
}


export default ( App );
