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






const StrainSearch = props => {
  console.log(props.strains)
   
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  // const search = nameArr => {
  //     setFilteredStrains(nameArr)
  // }

  useEffect(() => {
      props.getStrains();
  }, [])

  useEffect(() => {
      axiosWithAuth()
          .get('/strains')
          .then(res => {
              console.log('strainsearch',res);
              const searchResult = res.data.filter(item => item.strain_name.toLowerCase().includes(query.toLowerCase()));
              setData(searchResult);
          })
          .catch(err => console.log(err));
  }, [query]);

  const handleChanges = e => {
      setQuery(e.target.value);
  };

  


  return (
    <>
    <Header />
      <div className="bigBG">
      <div className="homeWrap">
          
          <div className="pWrap">
          
          </div>
          <div className="title">
              <h1>Strains</h1>
          </div>
          {/* <SearchDiv> */}
          <form>
              <input
              onChange={handleChanges}
              type="text"
              name="search"
              value={query}
              placeholder="Search a Strain"/>
          </form>
          {/* {data.map((item, i) => (
              <p key={i}>{item.strain_name}</p>
          ))} */}
          {/* </SearchDiv> */}
          <div className="cardBox">
          {data.map((props, i) => (
              <StrainCard
                  // strains={props.strains}
                key={i}
                strain_id={props.id}
                name={props.strain_name}
                type={props.type}
                rating={props.rating}
                description={props.description}
                strain_effects={props.effects}
                effects={props.effects.map((effect, i) => 
                      <li key={i}>{effect}</li>
                )}
                strain_flavors={props.flavors}
                flavors={props.flavors.map((flavor, i) => 
                  <li key={i}>{flavor}</li>
                )}
              />
                 ))}
          </div>
      </div>
      </div>
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