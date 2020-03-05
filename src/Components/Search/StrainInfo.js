import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components'

const Card = styled.div`
    background-color:white;
    border-radius:10px;
    margin:10%;
    display:flex;
    flex-direction:column;
    > .heading {
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        background-color:#3CB371;
        color:white;
        padding:20px;
        fill:white;
        > div:first-child {
            width:2%;
            font-size:150%;
            a {
                color:white;
                &:hover {
                    color:#98FB98;
                }
            }
        }
        > div:last-child {
            display:flex;
            justify-content:center;
            align-items:center;
            width:98%;
        }
    }
    h1 {
        font-weight:bold;
        font-size:200%;
    }
`

const StrainInfoCard = ({data}) => {
    return (
        <Card>
            <div className="heading"><div><Link to="/strains">{`<`}</Link></div><div><ReactSVG src={`${data.race}.svg`} /><h1>{data.name}</h1></div></div>
            <div><p>ID: {data.id}</p><p>{data.race}</p><p>Rating: {data.strain_rating}</p></div>
        </Card>
    )
}

export default StrainInfoCard;