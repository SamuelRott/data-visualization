import React  from 'react';
import styled from 'styled-components';

import BarChart from 'src/components/BarChart';
import SvgBarChart from 'src/components/SvgBarChart';
import SharedTrack from 'src/components/SharedTrack';
import TracksAmount from 'src/components/TracksAmount';


const Container = styled.div`
    color: #fff;
`;

export default function App( props )
{
    return (

        <Container>
          <TracksAmount/>
          <SvgBarChart/>
        </Container>

    );
}
