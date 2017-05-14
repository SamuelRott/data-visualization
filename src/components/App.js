import React  from 'react';
import styled from 'styled-components';
import BarChart from 'src/components/BarChart'


const Container = styled.div`
    color: #00F;
`;

export default function App( props )
{
    return (

        <Container>
            <BarChart/>
        </Container>

    );
}
