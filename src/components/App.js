import React  from 'react';
import styled from 'styled-components';

import BarChart from 'src/components/BarChart'
import SvgBarChart from 'src/components/SvgBarChart'



const Container = styled.div`
    color: #00F;
`;

export default function App( props )
{
    return (

        <Container>
          <BarChart/>
          <SvgBarChart/>
        </Container>

    );
}
