import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import StrainCard from '../Search/StrainCard';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import styled from 'styled-components';

const Container = styled.section`
  background-color:#98FB98;
  width:100%;
  height:100vh;
`

const CardContainer = styled.section`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  .error {
    color:red;
    margin-top:10px;
  }
`

const CabinetList = () => {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [query, setQuery] = useState("");
    const [failure, setFailureStatus] = useState(false);
    const [pagination, updatePagination] = useState({
      lowest: 0,
      highest: 12,
    })
    const [favoriteMap, updateFavoriteMap] = useState();

    useEffect(() => getData(), []);

    const getData = () => {
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`)
        .then(response => {
            setFailureStatus(false);
            console.log(response.data);
            setData(response.data);
            setOriginalData(response.data);
            updateFavoriteMap(response.data.map(strain => {
                return {
                    id: strain.strain_id,
                    favorited: true,
                }
            }))
        })
        .catch(error => {
            setFailureStatus(true);
            console.log("CabinetList.js – could not fetch data", error);
          })
    }

    return (
        <Container>
            <Search displaySort={false} setQuery={setQuery} getData={getData} originalData={originalData} query={query} setData={setData} data={data} updatePagination={updatePagination} pagination={pagination}/>
            <CardContainer>
                {data.slice(pagination.lowest, pagination.highest).map(strain => {
                    if (favoriteMap !== undefined) {
                    return (
                        <StrainCard strain={strain} updatePagination={updatePagination} favoriteMap={favoriteMap} updateFavoriteMap={updateFavoriteMap}/>
                    )
                    }
                })}
                <div className="error" style={failure ? {display:"block"} : {display:"none"}}>Favorites list empty.</div>
            </CardContainer>
        </Container>
    )
}

export default CabinetList;