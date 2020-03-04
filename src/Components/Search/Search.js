import React from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components'

const FormContainer = styled.div`
  margin-top:10px;
  display:flex;
  justify-content:center;
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

const Search = ({setQuery, getData, setData, originalData, query, pagination, updatePagination, data}) => {

    const updateQuery = event => setQuery(event.target.value);
    const sortList = event => {
        setQuery("");
        getData(event.target.value);
    }

    const handleSearch = event => {
        event.preventDefault();
        const filteredData = originalData.filter(strain => {
          let passed = false;
          Object.values(strain).forEach(value => {
            if ((typeof value === "string") && (!(value.includes("https")))) {
              if (value.toLowerCase().includes(query.toLowerCase())) {
                passed = true;
              }
            }
          })
          return passed === true;
        })
        setData(filteredData);
        console.log(data);
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
        <FormContainer>
          <button style={{marginLeft: "50px"}} onClick={previousPage}>previous</button>
          <form onSubmit={handleSearch} autoComplete="off">
            <div>
              <div><ReactSVG src="search.svg" /></div>
              <input type="text" name="search" id="search" onChange={updateQuery} value={query}/>
              <button type="submit">Search</button>
            </div>
          </form>
          {/* <div>
            <select name="race" onChange={sortList}>
              <option value="name">Name</option>
              <option value="race">Race</option>
              <option value="strain_rating">Rating</option>
            </select>
          </div> */}
          <button style={{marginRight: "50px"}} onClick={nextPage}>next</button>
        </FormContainer>
    )
}

export default Search;