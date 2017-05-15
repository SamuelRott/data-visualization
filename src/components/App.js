import React  from 'react';
import styled from 'styled-components';

import BarChart from 'src/components/BarChart'
import SvgBarChart from 'src/components/SvgBarChart'
import SharedTrack from 'src/components/SharedTrack'



const Container = styled.div`
    color: #00F;
`;

export default function App( props )
{
    return (

        <Container>

          <SharedTrack/>
        </Container>

    );
}
