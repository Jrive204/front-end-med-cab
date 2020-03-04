
import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import SearchForm from "./Components/Search/SearchForm";
import RecommendForm from "./Components/Recommend/RecommendForm";
import CabinetList from "./Components/PersonalCabinet/CabintList";


const App = () => {
  return (
    <>
      
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/strains" component={SearchForm} />
      
      <PrivateRoute path="/recommender" component={RecommendForm} />
      <Route exact path="/cabinet" component={CabinetList} />
      {/* <PrivateRoute exact path="/cabinet/strain/:id" component={CabinetStrain} /> */}
    </>
  );
};

export default App;
