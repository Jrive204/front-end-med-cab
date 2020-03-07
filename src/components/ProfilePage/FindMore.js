import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  margin: 10% 0;
  div {
    border: 1px solid black;
    border-radius: 20px;
    width: 25%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
    @media (max-width: 500px) {
      width: 40%;
      text-align: center;
      font-size: 1.1rem;
    }
    h3 {
      font-size: 2rem;
      margin: 0 auto;
    }
  }
`;

const FindMore = () => {
  return (
    <Buttons>
      <div>
        <Link to='/recommendation-form'>
          <h3>Rec's</h3>
          <p>Find more strains</p>
        </Link>
      </div>
      <div>
        <Link to='/strains'>
          <h3>All Strains</h3>
          <p>Look through all the strains</p>
        </Link>
      </div>
    </Buttons>
  );
};

export default FindMore;
