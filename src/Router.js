import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "./routes/Auth";
import Navigation from "./components/Navigation";
import Store from "./routes/Store";
import OnSale from "routes/OnSale";
import MenuBar from "./components/MenuBar";
import "./css/Router.css";
import { useSelector } from "react-redux";

const AppRouter = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
                            <Profile />
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
