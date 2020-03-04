import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import { getStrains, findStrain } from '../../Actions/index';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

const Card = styled.div`
    width:300px;
    background-color:white;
    border-radius:5px;
    border: 1px solid #F5F5F5;
    margin:10px;
    text-align:center;
    > div:first-child {
        background-color:#3CB371;
        display:flex;
        justify-content:center;
        color:white;
        font-size:130%;
        font-weight:bold;
        padding:5px;
    }
    > div:last-child {
        padding:5px;
        display:flex;
        flex-direction:column;
        align-items:center;
        > div:first-child {
            width:90%;
            display:flex;
            justify-content:space-between;
            > * {
                width:50px;
            }
            button {
                border-radius:20px;
                outline:none;
                width:40px;
                border:0;
                display:flex;
                align-items:center;
                justify-content:center;
                &:focus {
                    outline:none;
                }
                &:hover {
                    cursor:pointer;
                    fill:#3CB371;
                }
            }
        }
    }
    h3 {
        margin-top:5px;
        font-weight:bold;
    }
`

const StrainCard = ({strain, favoriteMap, updatePagination, updateFavoriteMap}) => {
    let favIndex = 0;
    favoriteMap.forEach((favorite, index) => {
        if (favorite.id === strain.id) {
            favIndex = index;
        }
    })

    const favoriteStatus = () => {
        if (favoriteMap[favIndex].favorited === false) {
            updateFavoriteState(true);
        }
        else {
            updateFavoriteState(false);
        }
    }

    const updateFavoriteState = (boolean) => {
        const newMap = favoriteMap.map(object => {
            if (object.id === strain.id) {
                return {
                    id: object.id,
                    favorited: boolean,
                }
            }
            else {
                return object;
            }
        })
        updateFavoriteMap(newMap);
    }

    return (
        <Card>
            <div><h2>{strain.name}</h2></div>
            <div>
                <div><h3>{strain.strain_rating}</h3><h3>{strain.race}</h3><div><button onClick={favoriteStatus}><ReactSVG style={favoriteMap[favIndex].favorited ? {display: "none"} : {display: "block"}}src="heart-open.svg"/><ReactSVG style={favoriteMap[favIndex].favorited ? {display: "block"} : {display: "none"}}src="heart-closed.svg"/></button></div></div>
                <div>
                    <h3>Flavors</h3>
                    <p>{strain.flavors}</p>
                </div>
                <div>
                    <h3>Helpful for</h3>
                    <p style={{fontSize: "80%"}}>{strain.medical}</p>
                </div>
            </div>
        </Card>
    )
}

const mapStateToProps = state => ({
    strains: state.strainReducer.strains,
    error: state.strainReducer.error,
    isFetching: state.strainReducer.isFetching
});


export default connect(
    mapStateToProps,
    { getStrains, findStrain }
)(StrainCard);