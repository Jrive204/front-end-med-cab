import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #98fb98;
`;

export const Profile = styled.div`
  border-radius: 10px;
  border: 1px solid #f5f5f5;
  margin-top: 30px;
  background-color: white;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > div:first-child {
    background-color: #3cb371;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    padding: 15px 10% 0 10%;
    color: white;
    @media (max-width: 800px) {
      padding: 0;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }
`;

export const Welcome = styled.div`
  font-size: 200%;
  font-weight: normal;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
  margin: 10px 0 25px;

  @media (max-width: 800px) {
    width: 100%;
    text-align: center;
    /* height: 20vh; */
  }
`;

export const UserCard = styled.div`
  margin-top: 20px;
  display: flex;
  width: 75%;
  height: 100%;
  justify-content: space-between;
  background-color: #f5f5f5;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 0px;
  @media (max-width: 800px) {
    width: 45%;
    margin-left: 8%;
  }
`;

export const Image = styled.div`
  background-color: #3cb371;
  width: 10rem;
  height: 10rem;
  border-radius: 10px;
  fill: white;
`;

export const InfoHeader = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 800px) {
    display: none;
  }

  .infoItems {
    margin: 7px 0;
    font-weight: 800;
  }
`;

export const Info = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
  width: 55%;
  .infoItems {
    margin: 10px 0 20px;
    margin-left: 30%;
    @media (min-width: 1300px) {
      margin-left: 5px;
    }
  }
`;

export const BottomContent = styled.div`
  width: 100%;
`;

export const ProfileNav = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  text-align: center;
  margin-bottom: 1%;

  flex-wrap: wrap;
  @media (max-width: 800px) {
    margin-top: 20px;
    width: 100%;
    height: 8vh;
    text-align: center;
  }
  div {
    font-size: 1.5rem;
    width: 50%;
    &:first-child {
      padding-right: 40px;
    }
    a {
      text-decoration: none;
    }
  }
`;
