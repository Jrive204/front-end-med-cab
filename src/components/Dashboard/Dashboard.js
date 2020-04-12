import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../Utils/axiosWithAuth";

const Dashboard = (props) => {
  useEffect(() => {
    axiosWithAuth()
      .get("https://medcabinet1.herokuapp.com/api/users/user")
      .then((response) => {
        console.log(response);
        localStorage.setItem("userID", response.data.subject);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-container">
        <Link to="/recommender">
          <div className="button">
            <h3>Recommender</h3>
          </div>
        </Link>

        <Link to="/strains">
          <div className="button">
            <h3>Strain Search</h3>
          </div>
        </Link>

        <Link to="/cabinet">
          <div className="button">
            <h3>My Cabinet</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
