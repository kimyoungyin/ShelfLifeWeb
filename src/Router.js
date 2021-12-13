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

const routes = [
    { component: Store, pathname: "/" },
    { component: OnSale, pathname: "/onSale" },
    { component: Profile, pathname: "/profile" },
];

const AppRouter = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const storeCode = useSelector((state) => state.products.storeCode);
    const deletingProduct = useSelector(
        (state) => state.products.deletingProductObj
    );

    const validatedRoute = (Route) => {
        if (!isLoggedIn) return <Redirect to="/auth" />;
        if (!storeCode) return <Redirect to="/register" />;
        return <Route storeCode={storeCode} />;
    };

    return (
        <Router>
            <MenuBar />
            <div className="Router-switch">
                <Switch>
                    {routes.map((obj) => (
                        <Route exact path={obj.pathname} key={obj.pathname}>
                            {validatedRoute(obj.component)}
                        </Route>
                    ))}
                    <Route exact path="/register">
                        {!isLoggedIn ? (
                            <Redirect to="/auth" />
                        ) : (
                            <Register storeCode={storeCode} />
                        )}
                    </Route>
                    <Route exact path="/auth">
                        {isLoggedIn ? <Redirect to="/" /> : <Auth />}
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
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
