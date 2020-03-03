import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Axios
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
// Actions
import { getStrains, findStrain } from '../../Actions/index';
// Components
import StrainCard from "./StrainCard";
import Header from "../Dashboard/Header";
import { ReactSVG } from "react-svg";
import styled from "styled-components";

const Container = styled.section`
  background-color:#98FB98;
  width:100%;
  height:100vh;
`

const FormContainer = styled.div`
  margin-top:20px;
  form {
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    > div:first-child {
      border: 1px solid #F5F5F5;
      &:hover {
        border: 1px solid cornflowerblue;
      }
    }
    > div:last-child {
      select {
        background-color:#3CB371;
        color:white;
        padding:10px;
        width: 100px;
      }
    }
    > div {
      margin: 0 10px;
    }
    div:first-child {
      border-radius:5px;
      padding:2px;
      background-color:#F5F5F5;
      display:flex;
      input {
        width:80%;
        background-color:inherit;
        outline:none;
        border:0;
        font-size:120%;
      }
      button {
        border-radius:5px;
        background-color:#3CB371;
        color:white;
        font-size:110%;
        &:hover {
          cursor:pointer;
          border:1px solid #98FB98;
          color:#98FB98;
        }
        &:active {
            background-color:#2E8B57;
            outline:none;
        }
        &:focus {
            outline:none;
      }
    }
  }
`

const ButtonsContainer = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
`

const CardContainer = styled.section`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  margin-top:5px;
`

const StrainSearch = props => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, updateSort] = useState("");
  const [pagination, updatePagination] = useState({
    lowest: 0,
    highest: 12,
  })

  useEffect(() => {
    if (sortBy.length <= 0) {
      axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains/`)
      .then(response => {
        console.log(response);
        setData(response.data);
      })
      .catch(err => {
        console.log("SearchForm.js – could not fetch data", err)
      });
    }
  }, [sortBy]);

  const handleChange = event => {
    axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains?sortby=${event.target.value}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log("SearchForm.js – could not sort data", error);
    })
  }

  const firstPage = () => {
    updatePagination({
      lowest: 0,
      highest: 12,
    })
  }

  const lastPage = () => {
    console.log("last page");
  }

  const nextPage = () => {
    updatePagination({
      lowest: pagination.lowest + 12,
      highest: pagination.highest + 12,
    })
    console.log(pagination);
  }

  const previousPage = () => {
    updatePagination({
      lowest: pagination.lowest - 12,
      highest: pagination.highest - 12,
    })
    console.log(pagination);
  }

  return (
    <>
      <Header />
      <Container>
        <FormContainer>
          <form>
            <div>
              <div><ReactSVG src="search.svg" /></div>
              <input type="text" name="search" id="search" />
              <button type="submit">Search</button>
            </div>
            <div>
              <select name="race" onChange={handleChange}>
                <option value="name">Name</option>
                <option value="race">Race</option>
                <option value="strain_rating">Rating</option>
              </select>
            </div>
          </form>
        </FormContainer>
        {/* <ButtonsContainer>
          <button onClick={firstPage}>first</button>
          <button onClick={previousPage}>previous</button>
          <button onClick={nextPage}>next</button>
          <button onClick={lastPage}>last</button>
        </ButtonsContainer> */}
        <CardContainer>
          {data.slice(pagination.lowest, pagination.highest).map(strain => {
            return (
              <StrainCard strain={strain}/>
            )
          })}
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
)(StrainSearch);