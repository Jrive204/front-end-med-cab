import React from "react";
import SignUpPage from './Components/SignUpPage'
import './App.css';
import { Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import StrainList from "./Components/Search/StrainList";
import RecommendForm from "./Components/Recommend/RecommendForm";
import CabinetList from "./Components/PersonalCabinet/CabintList";
import Header from "./Components/Dashboard/Header"


const App = () => {
  return (
    <>
      <Header />
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/strains" component={StrainList} />
      
      <PrivateRoute path="/recommender" component={RecommendForm} />
      <Route exact path="/cabinet" component={CabinetList} />
      {/* <PrivateRoute exact path="/cabinet/strain/:id" component={CabinetStrain} /> */}
    </>
  );
};

export default App;
