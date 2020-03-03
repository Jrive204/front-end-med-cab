import React, { useState, useEffect } from 'react'
import Header from '../Dashboard/Header';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";

const CabintList = () => {
    const [list, updateList] = useState([]);

    useEffect(() => {
        axiosWithAuth().get("https://medcabinet1.herokuapp.com/api/strains/")
        .then(response => {
            console.log(response);
            updateList(response.data);
        })
        .catch(error => {
            console.log("could not fetch data – ", error);
        })
    }, []);

    return (
        <div>
            <Header/>
            {list.map(strain => {
                return (
                    <div>{strain.name}</div>
                )
            })}
        </div>
    )
}

export default CabintList;