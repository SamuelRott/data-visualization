import React  from 'react';
import styled from 'styled-components';
// import propTypes from 'prop-types';
// import BarChart from 'src/components/BarChart';
import SvgBarChart from 'src/components/SvgBarChart';
// import SharedTrack from 'src/components/SharedTrack';
// import TracksAmount from 'src/components/TracksAmount';
// import AutoComplete from 'src/components/AutoComplete';
import ActiveChannels from 'src/components/ActiveChannels';


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
            channels : null,
            tracks   : null
        };
    }

    getChannels = () =>
    {
        return fetch(`${serverConstants.localChannels}channels.json`)
        .then(res => res.json());
    };

    getTracks = () =>
    {
        return fetch(`${serverConstants.localChannels}tracks.json`)
          .then(res => res.json());
    };

    componentDidMount()
    {
        this.getChannels()
          .then(channels => this.toArray(channels))
          .then( channels => this.setState({channels}))
          .then(() =>  this.getTracks())
          .then(tracks => this.toArray(tracks))
          .then(tracks => this.setState({tracks}))
          .catch();
    }

    toArray = (firebaseObj) =>
    {
        return Object.keys(firebaseObj).map(id =>
        {
            return Object.assign(firebaseObj[id], {id});
        });
    };

    render()
    {
        console.log('this.state', this.state);
        return (
            <Container>
              <ActiveChannels
                channels={this.state.channels || []}
                tracks={this.state.tracks || []}
              />
              <SvgBarChart channels={this.state.channels || []}   />
            </Container>
        );
    }
}


export default ( App );
