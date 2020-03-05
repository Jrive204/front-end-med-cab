import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Axios
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
// Actions
import { getStrains, findStrain } from '../../Actions/index';
// Components
import Search from './Search';
import StrainCard from "./StrainCard";
import styled from "styled-components";

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

const StrainList = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [query, setQuery] = useState("");
  const [failure, setFailureStatus] = useState(false);
  const [pagination, updatePagination] = useState({
    lowest: 0,
    highest: 12,
  })
  const [favoriteMap, updateFavoriteMap] = useState();

  useEffect(() => {
    getData("name");
  }, []);

  const getData = (sortType) => {
    axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains?sortby=${sortType}`)
    .then(response => {
      console.log(response);
      setFailureStatus(false);
      setData(response.data);
      setOriginalData(response.data);
      axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`)
      .then(favResponse => {
        console.log(favResponse.data);
        updateFavoriteMap(response.data.map(strain => {
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
        updateFavoriteMap(response.data.map(strain => {
          return {
            id: strain.id,
            favorited: false,
          }
        }))
      })
    })
    .catch(error => {
      setFailureStatus(true);
      console.log("StrainList.js – could not sort data", error);
    })
  }

  return (
    <>
      <Container>
        <Search setQuery={setQuery} getData={getData} originalData={originalData} query={query} setData={setData} data={data} updatePagination={updatePagination} pagination={pagination}/>
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
    </>
  );
};

const mapStateToProps = state => ({
  strains: state.strainReducer.strains,
  error: state.strainReducer.error,
  isFetching: state.strainReducer.isFetching
});


export default connect(
  mapStateToProps,
  { getStrains }
)(StrainList);