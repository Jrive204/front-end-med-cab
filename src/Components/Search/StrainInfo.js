import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components'

const Card = styled.div`
    background-color:white;
    border-radius:10px;
    margin:5%;
    display:flex;
    flex-direction:column;
    font-size:120%;
    border: 1px solid #F5F5F5;
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
    > div:last-child {
        padding:20px;
        .id-race-rating {
            display:flex;
            justify-content:space-between;
            font-weight:bold;
        }
        .description {
            text-align:center;
            margin:10px;
        }
        .effects {
            margin:10px;
            display:flex;
            align-items:center;
            flex-direction:column;
            > p:first-child {
                font-weight:bold;
            }
        }
    }
    h1 {
        font-weight:bold;
        font-size:150%;
    }
`

const StrainInfoCard = ({data}) => {
    return (
        <Card>
            <div className="heading"><div><Link to="/strains">{`<`}</Link></div><div><ReactSVG src={`${data.race}.svg`} /><h1>{data.name}</h1></div></div>
            <div>
                <div class="id-race-rating"><p>ID: {data.id}</p><p className="race">{data.race}</p><p>Rating: {data.strain_rating}</p></div>
                <div class="description">{data.strain_description}</div>
                <div class="effects">
                    <p>Flavors</p>
                    <p>{data.flavors}</p>
                </div>
                <div class="effects">
                    <p>Positive Effects</p>
                    <p>{data.positive}</p>
                </div>
                <div class="effects">
                    <p>Negative Effects</p>
                    <p>{data.negative}</p>
                </div>
                <div class="effects">
                    <p>Helpful for those who are experiencing:</p>
                    <p>{data.medical}</p>
                </div>
            </div>
        </Card>
    )
}

export default StrainInfoCard;