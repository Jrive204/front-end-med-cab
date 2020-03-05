import React, { useState, useEffect } from 'react';
import StrainInfo from './StrainInfo';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    background-color:#98FB98;
    width:100%;
    height:100vh;
`

const StrainInfoCard = () => {
    const { strainID } = useParams();
    const [data, setData] = useState({});
    
    useEffect(() => {
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains/`)
        .then(response => {
            response.data.forEach(strain => {
                if (strain.id.toString() === strainID) {
                    console.log(strain);
                    setData(strain);
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
    }, [setData])

    return (
        <Container>
            <StrainInfo data={data}/>
        </Container>
    )
}

export default StrainInfoCard;