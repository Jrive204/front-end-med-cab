import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StrainCard from '../Search/StrainCard';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import styled from 'styled-components';

const Container = styled.section`
  width: 70%;
  margin: 0 auto;
  display:flex;
  flex-direction:column;
  align-items:center;
  > a:first-child {
      div {
          background-color:#3CB371;
          color:white;
          border:1px solid #F5F5F5;
          border-radius:5px;
          padding:10px;
      }
      &:hover {
        text-decoration:none;
          div {
              border: 1px solid #98fb98;
              color: #98fb98;
          }
      }
      &:active {
          div {
              background-color:seagreen;
          }
      }
  }
`;

const CardContainer = styled.section`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  .error {
    color:red;
    margin-top:10px;
  }
`;

const MyFavs = () => {
    const [data, setData] = useState([]);
    const [failure, setFailureStatus] = useState(false);
    const [pagination, updatePagination] = useState({
        lowest: 0,
        highest: 4,
    })
    const [favoriteMap, updateFavoriteMap] = useState();

    useEffect(() => getData(), []);

    const getData = () => {
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`)
        .then(response => {
            setFailureStatus(false);
            console.log(response.data);
            setData(response.data);
            updateFavoriteMap(response.data.map(strain => {
                let match = false
                response.data.map(favorite => {
                    if (favorite.strain_id === strain.id) {
                        match = true;
                    }
                })
                if (match === true) {
                    return {
                    id: strain.id,
                    favorited: true,
                    }
                }
                else {
                    return {
                    id: strain.id,
                    favorited: false,
                    }
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
            <Link to='/cabinet'><div>See all your favorites</div></Link>
            <CardContainer>
                {data.slice(pagination.lowest, pagination.highest).map(strain => {
                    if (favoriteMap !== undefined) {
                    return (
                        <StrainCard strain={strain} updatePagination={updatePagination} favoriteMap={favoriteMap} updateFavoriteMap={updateFavoriteMap}/>
                    )
                    }
                })}
                <div className="error" style={failure ? {display:"block"} : {display:"none"}}>Could not fetch data. Try refreshing the page or logging out.</div>
            </CardContainer>
            
        </Container>
    )
}

export default MyFavs;