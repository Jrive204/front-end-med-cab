import React, { useState, useEffect } from 'react';
import StrainInfo from './StrainInfo';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    background-color:#98FB98;
    width:100%;
    height:150vh;
    padding:3% 5%;
`

const StrainInfoCard = () => {
    const { strainID } = useParams();
    const [data, setData] = useState({});
    const [favorited, setFavoriteStatus] = useState(false);
    
    useEffect(() => {
        let currentStrain = {};
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains/`)
        .then(response => {
            response.data.forEach(strain => {
                if (strain.id.toString() === strainID) {
                    console.log(strain);
                    currentStrain = strain;
                    setData(strain);
                }
            })
            axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`)
            .then(favResponse => {
                favResponse.data.map(favorite => {
                    if (favorite.strain_id === currentStrain.id) {
                        setFavoriteStatus(true);
                    }
                })
            })
            .catch(error => {
                console.log(error);
                setFavoriteStatus(false);
            })
        })
        .catch(error => {
            console.log(error);
        })
    }, [setData])

    return (
        <Container>
            <StrainInfo favorited={favorited} setFavoriteStatus={setFavoriteStatus} data={data}/>
        </Container>
    )
}

export default StrainInfoCard;