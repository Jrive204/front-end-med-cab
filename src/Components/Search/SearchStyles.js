import styled from 'styled-components';

export const FormContainer = styled.div`
  padding-top:10px;
  display:flex;
  justify-content:center;
  flex-direction: column;
  align-items:center;
  @media (max-width: 800px) {
        display: flex;
        flex-direction:column;
      }

  option{
    @media (max-width: 800px) {
        width: 50%;
        display: none;
      }
  }

.nextdiv{
  @media (max-width: 800px) {
        width: 50%;
        display:flex;
        align-items:center;
        justify-content:center;
      
      }
}

  select {
      background-color:#3CB371;
      color:white;
      font-size:100%;
      height:30px;
      @media (max-width: 800px) {
        display: none;
      }
      
  }
  .rec-toggle {
      margin-left:20px;
      width:150px;
      @media (max-width: 800px) {
        width: 50%;
        display: none;
      }
  }
  .sort-container {
      display:flex;
      margin-top:.5%;
      align-items:center;
      justify-content:space-between;
      color:#3CB371;
      font-weight:bold;
      width:200px;
      margin-right:50px;
      border-radius:5px;
      @media (max-width: 800px) {
        display: none;
      }
      div{
        @media (max-width: 800px) {
        display: none;
      }
      }
      
      button {
          width:50px;
          @media (max-width: 800px) {
        display: none;
      }

      }
      select {
        height:35px;
        
        @media (max-width: 800px) {
        display: none;
      }
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
`;
