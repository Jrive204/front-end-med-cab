import React, { useState } from "react";
import SignUpPage from './Components/SignUpPage'
import './App.css';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import StrainList from "./Components/Search/StrainList";
import RecommendForm from "./Components/Recommend/RecommendForm";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import CabinetList from "./Components/PersonalCabinet/CabinetList";
import Header from "./Components/Dashboard/Header"


const App = () => {
  const [displayHeader, setHeaderDisplay] = useState(true);

  return (
    <>

      {/* <Header style={displayHeader ? {display: "block"} : {display: "none"}}/> */}
      <Header displayHeader={displayHeader}/>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/strains" component={StrainList} />
          <PrivateRoute path="/profile" component={ProfilePage} />      
        <PrivateRoute path="/recommender" component={RecommendForm} />
        <Route exact path="/cabinet" component={CabinetList} />
        <Route path="/">
          <SignIn setHeaderDisplay={setHeaderDisplay}/>
        </Route>
      </Switch>
      {/* <PrivateRoute exact path="/cabinet/strain/:id" component={CabinetStrain} /> */}
    </>
  );
};

export default App;
