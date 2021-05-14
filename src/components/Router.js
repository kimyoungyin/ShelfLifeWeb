import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Store from "../routes/Store";
import OnSale from "routes/OnSale";
import MenuBar from "./MenuBar";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <MenuBar />
      <div style={{ marginTop: "10px" }}>
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

  // return (
  //   <Router className="Router">
  //     <div className="Title">상미시간 관리 시스템</div>
  //     <>
  //       {isLoggedIn ? (
  //         <Switch>
  //           <Route exact path="/">
  //             <Store />
  //           </Route>
  //           <Route path="/OnSale">
  //             <OnSale />
  //           </Route>
  //           <Route exact path="/profile">
  //             <Profile userObj={userObj} />
  //           </Route>
  //         </Switch>
  //       ) : (
  //         <Switch>
  //           <Route exact path="/">
  //             <Auth />
  //           </Route>
  //         </Switch>
  //       )}
  //     </>
  //     {isLoggedIn && <Navigation />}
  //   </Router>
  // );
};

export default AppRouter;
