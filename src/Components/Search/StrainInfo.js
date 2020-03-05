import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import { useParams } from 'react-router-dom';

const StrainInfo = props => {
    const { strainID } = useParams();
    const [data, setData] = useState({});
    
    useEffect(() => {
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains/`)
        .then(response => {
            response.data.forEach(strain => {
                if (strain.id === strainID) {
                    setData(strain);
                }
            })
        })
    }, [])

    return (
        <div>{data.name}</div>
    )
}

export default StrainInfo;