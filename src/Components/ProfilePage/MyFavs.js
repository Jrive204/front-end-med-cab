import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StrainCard from "../Search/StrainCard";
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import styled from "styled-components";

const Container = styled.section`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  > a:first-child {
    div {
      background-color: #3cb371;
      color: white;
      border: 1px solid #f5f5f5;
      border-radius: 5px;
      padding: 10px;
    }
    &:hover {
      text-decoration: none;
      div {
        border: 1px solid #98fb98;
        color: #98fb98;
      }
    }
    &:active {
      div {
        background-color: seagreen;
      }
    }
  }
`;

const CardContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .error {
    color: red;
    margin-top: 10px;
  }
`;

const MyFavs = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [query, setQuery] = useState("");
  const [failure, setFailureStatus] = useState(false);
  const [pagination, updatePagination] = useState({
    lowest: 0,
    highest: 6,
  });
  const [favoriteMap, updateFavoriteMap] = useState();

  useEffect(
    () =>
      getData(
        `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
          "userID"
        )}/favorites`
      ),
    []
  );

  const getData = (path) => {
    axiosWithAuth()
      .get(path)
      .then((response) => {
        setFailureStatus(false);
        console.log(response.data);
        setData(response.data);
        setOriginalData(response.data);
        updateFavoriteMap(
          response.data.map((strain) => {
            return {
              id: strain.strain_id,
              favorited: true,
            };
          })
        );
      })
      .catch((error) => {
        setFailureStatus(true);
        console.log("CabinetList.js – could not fetch data", error);
      });
  };

  // useEffect(() => getData(), []);

  return (
    <Container>
      <Link to="/cabinet">
        <div>See all your favorites</div>
      </Link>
      <CardContainer>
        {data.slice(pagination.lowest, pagination.highest).map((strain) => {
          if (favoriteMap !== undefined) {
            return (
              <StrainCard
                cabinet={true}
                strain={strain}
                updatePagination={updatePagination}
                favoriteMap={favoriteMap}
                updateFavoriteMap={updateFavoriteMap}
              />
            );
          }
        })}
        <div
          className="error"
          style={failure ? { display: "block" } : { display: "none" }}
        >
          Favorites is currently empty
        </div>
      </CardContainer>
    </Container>
  );
};

export default MyFavs;
