import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { FormContainer } from "./SearchStyles";

const Search = ({
  setQuery,
  setData,
  originalData,
  query,
  pagination,
  updatePagination,
  data,
  getData,
  cabinet,
}) => {
  const [searchType, setSearchType] = useState("all");
  const [sort, setSort] = useState("name");
  const [ascending, setAscending] = useState(true);

  const updateQuery = (event) => setQuery(event.target.value);

  const updateSearchType = (event) => {
    setSearchType(event.target.value);
    console.log(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let filteredData = [];
    if (searchType === "all") {
      filteredData = originalData.filter((strain) => {
        let passed = false;
        Object.values(strain).forEach((value) => {
          if (typeof value === "string") {
            if (value.toLowerCase().includes(query.toLowerCase())) {
              passed = true;
            }
          }
        });
        return passed === true;
      });
    } else {
      filteredData = originalData.filter((strain) => {
        let passed = false;
        let correctKey = 0;
        Object.keys(strain).forEach((key, index) => {
          if (key === searchType) {
            correctKey = index;
          }
        });
        if (Object.values(strain)[correctKey] === null) {
          passed = false;
        } else if (
          Object.values(strain)
            [correctKey].toLowerCase()
            .includes(query.toLowerCase())
        ) {
          passed = true;
        }
        return passed === true;
      });
    }
    updatePagination({
      lowest: 0,
      highest: 12,
    });
    setData(filteredData);
    console.log(data);
  };

  const firstPage = () => {
    updatePagination({
      lowest: 0,
      highest: 12,
    });
  };

  const lastPage = () => {
    console.log(data.length % 12);
    updatePagination({
      lowest: data.length + (12 - (data.length % 12)) - 12,
      highest: data.length + (12 - (data.length % 12)),
    });
  };

  const nextPage = () => {
    if (pagination.highest < data.length) {
      updatePagination({
        lowest: pagination.lowest + 12,
        highest: pagination.highest + 12,
      });
    }
    console.log(pagination);
  };

  const previousPage = () => {
    if (pagination.lowest > 0) {
      updatePagination({
        lowest: pagination.lowest - 12,
        highest: pagination.highest - 12,
      });
    }
    console.log(pagination);
  };

  const setDirection = () => {
    let direction = ascending;
    if (ascending === true) {
      direction = false;
      setAscending(false);
    } else {
      direction = true;
      setAscending(true);
    }
    getData(sort, direction);
  };

  const clearQuery = () => {
    setQuery("");
  };

  const updateSort = (event) => {
    setSort(event.target.value);
    getData(event.target.value, ascending);
  };

  const changePath = (event) => {
    if (event.target.value === "recommendations") {
      getData(
        `https://medcabinet1.herokuapp.com/api/recommendedstrains/${localStorage.getItem(
          "userID"
        )}/user`
      );
    } else {
      getData(
        `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
          "userID"
        )}/favorites`
      );
    }
  };

  return (
    <FormContainer>
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
          <div>
            <ReactSVG src="search.svg" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            onChange={updateQuery}
            value={query}
          />
          <button type="button" onClick={clearQuery} className="clear-button">
            <ReactSVG src="clear.svg" />
          </button>
          <button type="submit">Search</button>
        </div>
      </form>
      <div
        className="sort-container"
        style={cabinet ? { display: "none" } : { display: "flex" }}
      >
        <div>Sort&nbsp;by</div>
        <select onChange={updateSort}>
          <option value="name">Name</option>
          <option value="strain_rating">Rating</option>
          <option value="race">Race</option>
          <option value="flavors">Flavors</option>
        </select>
        <button onClick={setDirection}>{ascending ? "a-z" : "z-a"}</button>
      </div>
      <div className="nextdiv" style={{ marginTop: "1%" }}>
        <button
          style={{ marginLeft: "50px" }}
          onClick={firstPage}
        >{`<<`}</button>

        <button onClick={previousPage}>prev</button>
        <button onClick={nextPage}>next</button>
        <button
          style={{ marginRight: "50px" }}
          onClick={lastPage}
        >{`>>`}</button>
      </div>
    </FormContainer>
  );
};

export default Search;
