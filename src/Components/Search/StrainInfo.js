import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { axiosWithAuth } from '../../Utils/axiosWithAuth';

const Card = styled.div`
    background-color:white;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    font-size:120%;
    border: 1px solid #F5F5F5;
    > .heading {
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        background-color:#3CB371;
        color:white;
        padding:20px;
        fill:white;
        > div:first-child {
            width:2%;
            font-size:150%;
            a {
                color:white;
                &:hover {
                    color:#98FB98;
                }
            }
        }
        > div:last-child {
            display:flex;
            justify-content:center;
            align-items:center;
            width:98%;
        }
    }
    > div:last-child {
        padding:20px;
        .id-race-rating {
            display:flex;
            justify-content:space-between;
            font-weight:bold;
        }
        .race {
            font-weight:bold;
            font-size:150%;
            display:flex;
            justify-content:center;
        }
        .description {
            text-align:center;
            background-color:#F5F5F5;
            border-radius:10px;
            padding:10px;
            margin:30px 10px 30px 10px;
        }
        .effects {
            margin:10px;
            display:flex;
            align-items:center;
            flex-direction:column;
            > p:first-child {
                font-weight:bold;
            }
        }
    }
    button {
        font-size:90%;
        padding:8px;
        background-color:#3CB371;
        color:white;
        border-radius:5px;
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
    h1 {
        font-weight:bold;
        font-size:180%;
    }
`

const StrainInfoCard = ({data, favorited, setFavoriteStatus}) => {
    const {goBack} = useHistory();
    
    const addToCabinet = () => {
        if (favorited === false) {
            axiosWithAuth().post(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`, {"strain_id": data.id})
            .then(response => {
                console.log(response);
                setFavoriteStatus(true);
            })
            .catch(error => {
                console.log(error);
            })
        }
        else {
            let idToDelete = 0;
            axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem("userID")}/favorites`)
            .then(response => {
                response.data.map(favorite => {
                    if (data.id === favorite.strain_id) {
                        idToDelete = favorite.id;
                    }
                })
                axiosWithAuth().delete(`https://medcabinet1.herokuapp.com/api/users/favorites/${idToDelete}`)
                .then(delResponse => {
                    setFavoriteStatus(false);
                    console.log(delResponse);
                })
                .catch(delError => {
                    console.log(delError);
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <Card>
            <div className="heading"><div><button onClick={() => goBack()}>{`<`}</button></div><div><h1>{data.name}</h1></div></div>
            <div>
                <div class="id-race-rating"><p>ID: {data.id}</p><p>Rating: {data.strain_rating}</p></div>
                <div class="race"><p>{data.race}</p></div>
                <div class="description">{data.strain_description}</div>
                <div class="effects">
                    <p>Flavors</p>
                    <p>{data.flavors}</p>
                </div>
                <div class="effects">
                    <p>Positive Effects</p>
                    <p>{data.positive}</p>
                </div>
                <div class="effects">
                    <p>Negative Effects</p>
                    <p>{data.negative}</p>
                </div>
                <div class="effects">
                    <p>Helpful for those who are experiencing:</p>
                    <p>{data.medical}</p>
                </div>
                <div class="effects"><button onClick={addToCabinet}>{favorited ? "Remove From Cabinet" : "Add To Cabinet"}</button></div>
            </div>
        </Card>
    )
}

export default StrainInfoCard;