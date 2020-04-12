import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import { getStrains, findStrain } from "../../Actions/index";
import { ReactSVG } from "react-svg";
import styled from "styled-components";

const Card = styled.div`
    width:300px;
    background-color:white;
    border-radius:5px;
    border: 1px solid #F5F5F5;
    margin:10px;
    text-align:center;
    > div:first-child {
        align-items:center;
        a {
            border-top-left-radius:5px;
            border-top-right-radius:5px;
            text-decoration:none;
            background-color:#3CB371;
            display:flex;
            justify-content:center;
            color:white;
            fill:white;
            padding:3px;
            &:hover {
                color:#98FB98;
                fill:#98FB98;
            }
        }
    }
    > div:last-child {
        padding:5px;
        display:flex;
        flex-direction:column;
        align-items:center;
        > div:first-child {
            width:90%;
            display:flex;
            justify-content:space-between;
            > * {
                width:50px;
            }
            button {
                border-radius:20px;
                outline:none;
                width:40px;
                border:0;
                background-color:white;
                display:flex;
                align-items:center;
                justify-content:center;
                &:focus {
                    outline:none;
                }
                &:hover {
                    cursor:pointer;
                    fill:#3CB371;
                }
            }
        }
        > div:last-child {
            display:flex;
            flex-direction:column;
            align-items:center;
            > * {
                margin:0;
            }
        }
      }
    }
  }
  h2 {
      font-size:150%;
      font-weight:bold;
  }
  h3 {
    font-size:120%;
    margin-top: 1px;
    font-weight: bold;
    text-decoration:none;
    display:flex;
    align-items:center;
  }
`;

const StrainCard = ({ strain, favoriteMap, updateFavoriteMap, cabinet }) => {
  console.log(cabinet);
  console.log(favoriteMap);
  console.log(strain);
  let favIndex = 0;
  favoriteMap.forEach((favorite, index) => {
    if (cabinet === false) {
      if (favorite.id === strain.id) {
        favIndex = index;
      }
    } else {
      if (favorite.id === strain.strain_id) {
        favIndex = index;
      }
    }
  });

  const favoriteStatus = () => {
    if (favoriteMap[favIndex].favorited === false) {
      updateFavoriteState(true);
    } else {
      updateFavoriteState(false);
    }
  };

  const updateFavoriteState = (boolean) => {
    let strainID = 0;
    let newMap = [];
    if (cabinet === false) {
      newMap = favoriteMap.map((object) => {
        if (object.id === strain.id) {
          strainID = strain.id;
          return {
            id: object.id,
            favorited: boolean,
          };
        } else {
          return object;
        }
      });
    } else {
      newMap = favoriteMap.map((object) => {
        if (object.id === strain.strain_id) {
          strainID = strain.strain_id;
          return {
            id: object.id,
            favorited: boolean,
          };
        } else {
          return object;
        }
      });
    }
    if (boolean === true) {
      axiosWithAuth()
        .post(
          `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
            "userID"
          )}/favorites`,
          { strain_id: strainID }
        )
        .then((response) => {
          console.log(response);
          updateFavoriteMap(newMap);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let idToDelete = 0;
      axiosWithAuth()
        .get(
          `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
            "userID"
          )}/favorites`
        )
        .then((response) => {
          if (cabinet === false) {
            response.data.map((favorite) => {
              if (strain.id === favorite.strain_id) {
                idToDelete = favorite.id;
              }
            });
          } else {
            response.data.map((favorite) => {
              if (strain.strain_id === favorite.strain_id) {
                idToDelete = favorite.id;
              }
            });
          }
          axiosWithAuth()
            .delete(
              `https://medcabinet1.herokuapp.com/api/users/favorites/${idToDelete}`
            )
            .then((delResponse) => {
              updateFavoriteMap(newMap);
              console.log(delResponse);
            })
            .catch((delError) => {
              console.log(delError);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Card>
      <div>
        <Link
          to={
            cabinet ? `/strains/${strain.strain_id}` : `/strains/${strain.id}`
          }
        >
          <ReactSVG src={`${strain.race}.svg`} />
          <h2>{strain.name}</h2>
        </Link>
      </div>
      <div>
        <div>
          <h3>
            <ReactSVG src="rating.svg" />
            {strain.strain_rating}
          </h3>
          <h3>{strain.race}</h3>
          <div>
            <button onClick={favoriteStatus}>
              <ReactSVG
                style={
                  favoriteMap[favIndex].favorited
                    ? { display: "none" }
                    : { display: "block" }
                }
                src="heart-open.svg"
              />
              <ReactSVG
                style={
                  favoriteMap[favIndex].favorited
                    ? { display: "block" }
                    : { display: "none" }
                }
                src="heart-closed.svg"
              />
            </button>
          </div>
        </div>
        <div>
          <h3>Flavors</h3>
          <p>{strain.flavors}</p>
        </div>
      </div>
    </Card>
  );
};

export default StrainCard;
