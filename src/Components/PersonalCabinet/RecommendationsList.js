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

const RecommendationsList = () => {
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
        axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains`)
        .then(response => {
            axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/recommendedstrains/${localStorage.getItem("userID")}/user`)
            .then(recResponse => {
                console.log(response.data);
                console.log(recResponse.data.strain_id);
                let recommendedStrains = [];
                response.data.map(strain => {
                    let match = false;
                    recResponse.data.strain_id.map(favStrain => {
                        if (favStrain === strain.id) {
                            match = true;
                        }
                    })
                    if (match === true) {
                        recommendedStrains.push(strain);
                    }
                })
                console.log(recommendedStrains);
                setData(recommendedStrains);
                setOriginalData(recommendedStrains);
                axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`)
                .then(favResponse => {
                  updateFavoriteMap(recommendedStrains.map(strain => {
                    let match = false
                    favResponse.data.map(favorite => {
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
                .catch(favError => {
                  console.log("Couldn't fetch favorites list for user – it's possible the list is empty", favError);
                  updateFavoriteMap(recommendedStrains.map(strain => {
                    return {
                      id: strain.id,
                      favorited: false,
                    }
                  }));
                })
            })
            .catch(recError => {
                console.log(recError);
                setFailureStatus(true);
            })
        })
        .catch(error => {
            console.log(error);
            setFailureStatus(true);
        })

    }

    return (
        <Container>
            <Search cabinet={false} setQuery={setQuery} getData={getData} originalData={originalData} query={query} setData={setData} data={data} updatePagination={updatePagination} pagination={pagination}/>
            <CardContainer>
                {data.slice(pagination.lowest, pagination.highest).map(strain => {
                    if (favoriteMap !== undefined) {
                    return (
                        <StrainCard cabinet={false} strain={strain} updatePagination={updatePagination} favoriteMap={favoriteMap} updateFavoriteMap={updateFavoriteMap}/>
                    )
                    }
                })}
                <div className="error" style={failure ? {display:"block"} : {display:"none"}}>Favorites list empty.</div>
            </CardContainer>
        </Container>
    )
}

export default RecommendationsList;