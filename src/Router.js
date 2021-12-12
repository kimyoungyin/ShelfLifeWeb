import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "./routes/Auth";
import Navigation from "./components/Navigation";
import Store from "./routes/Store";
import OnSale from "routes/OnSale";
import MenuBar from "./components/MenuBar";
import "./css/Router.css";
import { useSelector } from "react-redux";
import Register from "routes/Register";
import Confirm from "components/Confirm";

const AppRouter = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const storeCode = useSelector((state) => state.products.storeCode);
    const deletingProduct = useSelector(
        (state) => state.products.deletingProductObj
    );

    return (
        <Router>
            <MenuBar />
            <div className="Router-switch">
                {storeCode === null && <Redirect from="*" to="/register" />}
                {isLoggedIn || <Redirect from="*" to="/auth" />}
                <Switch>
                    <Route exact path="/">
                        <Store storeCode={storeCode} />
                    </Route>
                    <Route exact path="/auth">
                        {isLoggedIn ? <Redirect to="/" /> : <Auth />}
                    </Route>
                    <Route path="/onSale">
                        <OnSale />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/register">
                        <Register storeCode={storeCode} />
                    </Route>
                </Switch>
            </div>
            {deletingProduct && (
                <Confirm confirmObj={deletingProduct} storeCode={storeCode} />
            )}
            {isLoggedIn && <Navigation />}
        </Router>
    );
};

export default AppRouter;
