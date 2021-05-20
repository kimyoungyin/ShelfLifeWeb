import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Store from "../routes/Store";
import OnSale from "routes/OnSale";
import MenuBar from "./MenuBar";
import "../css/Router.css";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <MenuBar />
      <div className="Router-switch">
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/">
              <Store />
            </Route>
            <Route path="/OnSale">
              <OnSale />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
          </Switch>
        )}
      </div>
      {isLoggedIn && <Navigation />}
    </Router>
  );

};

export default AppRouter;
