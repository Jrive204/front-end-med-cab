import React, { useState } from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import StrainList from "./components/Search/StrainList";
import RecommendForm from "./components/Recommend/RecommendForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import CabinetList from "./components/PersonalCabinet/CabinetList";
import Header from "./components/Dashboard/Header"


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
