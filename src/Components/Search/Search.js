import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components'

const FormContainer = styled.div`
  margin-top:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  select {
      background-color:#3CB371;
      color:white;
      font-size:100%;
      height:30px;
  }
  .sort-container {
      display:flex;
      align-items:center;
      justify-content:space-between;
      color:#3CB371;
      font-weight:bold;
      width:150px;
      margin-right:50px;
      border-radius:5px;
      select {
          height:35px;
      }
  }
  form {
    width:100%;
    display:flex;
    flex:5;
    justify-content:center;
    align-items:center;
    > div:last-child {
      border: 1px solid #F5F5F5;
      &:hover {
        border: 1px solid cornflowerblue;
      }
    }
    > div {
      margin: 0 10px;
      display:flex;
      align-items:center;
    }
    div:last-child {
      border-radius:5px;
      padding:2px;
      background-color:#F5F5F5;
      display:flex;
      input {
        width:80%;
        background-color:#F5F5F5;
        outline:none;
        border:0;
        font-size:120%;
      }
    }
  }
  button {
    border-radius:5px;
    background-color:#3CB371;
    color:white;
    font-size:110%;
    width:100px;
    height:35px;
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
  &.clear-button {
      background-color:#F5F5F5;
      width:50px;
      outline:none;
      border:0;
      fill:lightgray;
      &:hover {
        fill:#A9A9A9;
      }
  }
`

const Search = ({setQuery, setData, originalData, query, pagination, updatePagination, data, getData, displaySort}) => {
    const [searchType, setSearchType] = useState("all");

    const updateQuery = event => setQuery(event.target.value);

    const updateSearchType = event => {
        setSearchType(event.target.value);
        console.log(event.target.value);
    }

    const handleSearch = event => {
        event.preventDefault();
        let filteredData = [];
        if (searchType === "all") {
            filteredData = originalData.filter(strain => {
                let passed = false;
                Object.values(strain).forEach(value => {
                  if (typeof value === "string") {
                    if (value.toLowerCase().includes(query.toLowerCase())) {
                      passed = true;
                    }
                  }
                })
                return passed === true;
            })
        }
        else {
            filteredData = originalData.filter(strain => {
                let passed = false;
                let correctKey = 0;
                Object.keys(strain).forEach((key, index) => {
                    if (key === searchType) {
                        correctKey = index;
                    }
                });
                if (Object.values(strain)[correctKey] === null) {
                    passed = false;
                }
                else if (Object.values(strain)[correctKey].toLowerCase().includes(query.toLowerCase())) {
                    passed = true;
                }
                return passed === true;
            })
        }
        updatePagination({
            lowest: 0,
            highest: 12,
        })
        setData(filteredData);
        console.log(data);
    }

    const firstPage = () => {
        updatePagination({
            lowest: 0,
            highest: 12,
        })
    }

    const lastPage = () => {
        console.log(data.length % 12);
        updatePagination({
            lowest: (data.length + (12 - data.length % 12) - 12),
            highest: data.length + (12 - data.length % 12),
        })
    }

    const nextPage = () => {
        if (pagination.highest < data.length) {
            updatePagination({
                lowest: pagination.lowest + 12,
                highest: pagination.highest + 12,
            })
        }
        console.log(pagination);
    }
    
    const previousPage = () => {
        if (pagination.lowest > 0) {
            updatePagination({
                lowest: pagination.lowest - 12,
                highest: pagination.highest - 12,
            })
        }
        console.log(pagination);
    }

    const clearQuery = () => {
        setQuery("");
    }

    const updateSort = event => {
        getData(event.target.value);
    }

    return (
        <FormContainer>
            <button style={{marginLeft: "50px"}} onClick={firstPage}>{`<<`}</button>
            <button onClick={previousPage}>previous</button>
            <form onSubmit={handleSearch} autoComplete="off">
                <select onChange={updateSearchType}>
                    <option value="all">All Info</option>
                    <option value="name">Name</option>
                    <option value="race">Race</option>
                    <option value="negative">Negative Effects</option>
                    <option value="positive">Positive Effects</option>
                    <option value="flavors">Flavors</option>
                    <option value="medical">Medical Attributes</option>
                    <option value="strain_description">Description</option>
                </select>
                <div>
                    <div><ReactSVG src="search.svg" /></div>
                    <input type="text" name="search" id="search" onChange={updateQuery} value={query}/>
                    <button type="button" onClick={clearQuery} className="clear-button"><ReactSVG src="clear.svg"/></button>
                    <button type="submit">Search</button>
                </div>
            </form>
            <div className="sort-container" style={displaySort ? {display:"flex"} : {display:"none"}}>
                <div>Sort by</div>
                <select onChange={updateSort}>
                    <option value="name">Name</option>
                    <option value="strain_rating">Rating</option>
                    <option value="race">Race</option>
                    <option value="flavors">Flavors</option>
                </select>
            </div>
          <button onClick={nextPage}>next</button>
          <button style={{marginRight: "50px"}} onClick={lastPage}>{`>>`}</button>
        </FormContainer>
    )
}

export default Search;