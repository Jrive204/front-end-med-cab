// React
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Axios
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
// Actions
import { getStrains, findStrain } from '../../Actions/index';
import styled from 'styled-components';

const Card = styled.div`
    width:300px;
    background-color:white;
    border-radius:5px;
    border: 1px solid #F5F5F5;
    margin:10px;
    text-align:center;
    div:first-child {
        background-color:#3CB371;
        display:flex;
        justify-content:center;
        color:white;
        font-size:130%;
        font-weight:bold;
        padding:5px;
    }
    div:last-child {
        padding:5px;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    h3 {
        margin-top:5px;
        font-weight:bold;
    }
`

const StrainCard = ({strain}) => {
    return (
        <Card>
            <div><h2>{strain.name}</h2></div>
            <div>
                <h3>{strain.race}</h3>
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