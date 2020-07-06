import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import StrainCard from '../Search/StrainCard';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Fetch } from '../../Actions/index';

const Container = styled.section`
  background-color: #98fb98;
  width: 100%;
  height: 100vh;
`;

const CardContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
`;

const RecommendationsList = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [query, setQuery] = useState('');
  const [failure, setFailureStatus] = useState(false);
  const [pagination, updatePagination] = useState({
    lowest: 0,
    highest: 12,
  });
  const [favoriteMap, updateFavoriteMap] = useState();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.isloading);
  const error = useSelector((state) => state.error);

  let recommendedStrains = [];

  let check = data.length === 0;

  useEffect(
    () => dispatch(Fetch(`/usersdata/${localStorage.getItem('userID')}/user`)),
    []
  );
  function refreshPage() {
    window.location.reload();
  }

  const getData = () => {
    axiosWithAuth()
      .get(`https://medcabinet1.herokuapp.com/api/strains`)
      .then((response) => {
        axiosWithAuth()
          .get(
            `https://medcabinet1.herokuapp.com/api/recommendedstrains/${localStorage.getItem(
              'userID'
            )}/user`
          )
          .then((recResponse) => {
            console.log(response.data);
            console.log(recResponse.data.strain_id);
            // let recommendedStrains = [];
            response.data.map((strain) => {
              let match = false;
              recResponse.data.strain_id.map((favStrain) => {
                if (favStrain === strain.id) {
                  match = true;
                }
              });
              if (match === true) {
                recommendedStrains.push(strain);
              }
            });
            console.log(recommendedStrains);
            setData(recommendedStrains);
            setOriginalData(recommendedStrains);
            axiosWithAuth()
              .get(
                `https://medcabinet1.herokuapp.com/api/users/${localStorage.getItem(
                  'userID'
                )}/favorites`
              )
              .then((favResponse) => {
                updateFavoriteMap(
                  recommendedStrains.map((strain) => {
                    let match = false;
                    favResponse.data.map((favorite) => {
                      if (favorite.strain_id === strain.id) {
                        match = true;
                      }
                    });
                    if (match === true) {
                      return {
                        id: strain.id,
                        favorited: true,
                      };
                    } else {
                      return {
                        id: strain.id,
                        favorited: false,
                      };
                    }
                  })
                );
              })
              .catch((favError) => {
                console.log(
                  "Couldn't fetch favorites list for user – it's possible the list is empty",
                  favError
                );
                updateFavoriteMap(
                  recommendedStrains.map((strain) => {
                    return {
                      id: strain.id,
                      favorited: false,
                    };
                  })
                );
              });
          })
          .catch((recError) => {
            console.log(recError);
            setFailureStatus(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setFailureStatus(true);
      });
  };
  useEffect(() => getData(), [check, loading]);

  return (
    <Container>
      <Search
        cabinet={false}
        setQuery={setQuery}
        getData={getData}
        originalData={originalData}
        query={query}
        setData={setData}
        data={data}
        updatePagination={updatePagination}
        pagination={pagination}
      />
      {console.log(check, 'CHECK')}
      {loading && (
        <Loader
          type='BallTriangle'
          color='#00BFFF'
          height={100}
          width={100}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}
          timeout={5000} //3 secs
        />
      )}
      {console.log(error, 'ERROR')}

      {!data && !loading && (
        <>
          <div className='waiting-cont' style={{ overflow: 'hidden' }}>
            <p
              style={{
                textAlign: 'center',
                fontFamily: "  font-family: 'Londrina Solid', cursive",
              }}
            >
              Our Scientist are Still <span>Working Hard</span> To find you the
              Perfect Strains!!
              <span>
                <img
                  src='https://media.giphy.com/media/gLftX4zfedCNO/giphy.gif'
                  alt='logo'
                  style={{ width: '75px' }}
                />
              </span>
            </p>
            <button type='button' onClick={refreshPage}>
              {' '}
              <span>Reload</span>{' '}
            </button>
          </div>
        </>
      )}

      {data && !loading && (
        <CardContainer>
          {data.slice(pagination.lowest, pagination.highest).map((strain) => {
            if (favoriteMap !== undefined) {
              return (
                <StrainCard
                  cabinet={false}
                  strain={strain}
                  updatePagination={updatePagination}
                  favoriteMap={favoriteMap}
                  updateFavoriteMap={updateFavoriteMap}
                />
              );
            }
          })}
          {/* <div
            className='error'
            style={failure ? { display: 'block' } : { display: 'none' }}>
            No current Recommendations, Please fill out form located at the nav
            har
          </div> */}
          {error ? (
            <div
              className='error'
              style={failure ? { display: 'block' } : { display: 'none' }}
            >
              No current Recommendations, Please fill out form located at the
              nav bar <br />
              <button type='button' onClick={refreshPage}>
                {' '}
                <span>Reload</span>{' '}
              </button>
            </div>
          ) : data.length === 0 && failure ? (
            <div className='waiting-cont' style={{ overflow: 'hidden' }}>
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: "  font-family: 'Londrina Solid', cursive",
                }}
              >
                Our Scientist are <span>Working Hard</span> To find you the
                Perfect Strains!!
                <span>
                  <img
                    src='https://media.giphy.com/media/gLftX4zfedCNO/giphy.gif'
                    alt='logo'
                    style={{ width: '75px' }}
                  />
                </span>
              </p>
              <button type='button' onClick={refreshPage}>
                {' '}
                <span> Try a Reload</span>{' '}
              </button>
            </div>
          ) : null}
        </CardContainer>
      )}

      {console.log(failure, 'FAILURE')}
    </Container>
  );
};

export default RecommendationsList;
