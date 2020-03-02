import React, { useState } from "react";
import { connect } from "react-redux";
import Header from '../Dashboard/Header';
import axios from 'axios';


const SearchForm = props => {
  const [input, setInput] = useState({
    strain_name: 'name',
    
  });

  const onChange = event => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    props.strain_name({
      strain_name: input.strain_name,
      
      limit: 30,
      offset: 0
      
  });
    console.log(input);
  };

  return (
    <div>
      <Header/>

      <div className='go-back-container'>
        <p onClick={() => props.history.push('/dashboard')}><i className="fas fa-arrow-left"></i>go back</p>
      </div>

      <h2>Strain Search</h2>

      <form onSubmit={onSubmit}>
        <select name='filter' onChange={onChange}>
          <option value='strain_name'>Name</option>
          <option value='flavor'>Flavor</option>
          <option value='type'>Race</option>
          <option value='effects'>Effect</option>
          <option value='rating'>Rating</option>
        </select>

        <input type='text' name='query' placeholder='Enter a query' onChange={onChange}/>

        <button type='submit'>Submit</button>
      </form>
      
    </div>
  );
};

const mapStateToProps = state => {
  return {queriedStrains:state.queriedStrains};
};

export default connect(mapStateToProps)(SearchForm);