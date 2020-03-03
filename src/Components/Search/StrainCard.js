// React
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Axios
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
// Actions
import { getStrains, findStrain } from '../../Actions/index';
// Components

// Styling
// import {
//   Card, CardBody,
//   CardTitle, CardSubtitle, Button
// } from 'reactstrap';
//Icon Import
import Star from "../../img/star.png";



const StrainCard = (props) => {
    console.log('hello',props);

   
    const [strainID, setStrainID] = useState();
    const [strainData, setStrainData] = useState({});
    // console.log(strainData)

    useEffect(() => {
        console.log(strainID);
        if (strainID) {
            axiosWithAuth()
            .post(`/users/${localStorage.id}/strains`, strainID)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }, [strainID])

    const clickHandler = e => {
        e.preventDefault();
        // props.getStrains();
        console.log("E.TARGET.ID", e.target.id);
        setStrainID({ strainID: e.target.id });
        console.log("STRAINID", strainID);
        // setStrainData(strainHolder);
        alert("Strain saved!");
    };

    const strainHolder = {
        strain_id: props.strain_id,
        strain_name: props.name,
        strain_type: props.type,
        strain_rating: props.rating,
        strain_description: props.description,
        strain_effects: props.effects,
        strain_flavors: props.flavors
    }
    console.log('hello',strainHolder);

    return (
           
            <div className="bigBox">
                    <div className="card-cont" key={props.strain_id}>
                    <div className="card">  
                        <h4>Strain: {props.name}</h4>
                        <h5>Rating:</h5>
                        <div className="img">
                        <h6>{props.rating}</h6>
                            <img src={ Star } alt="logo credit"/>
                        </div>
                        {/* <button><Link to={`/strain-details/${props.strain_id}`} style={{ textDecoration: 'none', color: 'green' }}>Strain Details</Link></button> */}
                        <button id={props.strain_id} onClick={clickHandler}>Save Strain</button>
                        </div>
                    </div>
            </div>

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