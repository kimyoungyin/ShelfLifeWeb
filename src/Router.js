import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
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
        if (!isLoggedIn) return <Navigate to="/auth" />;
        if (!storeCode) return <Navigate to="/register" />;
        return <Route storeCode={storeCode} />;
    };

    return (
        <BrowserRouter>
            <MenuBar />
            <div className="Router-switch">
                <Routes>
                    {routes.map((obj) => (
                        <Route
                            path={obj.pathname}
                            key={obj.pathname}
                            element={validatedRoute(obj.component)}
                        />
                    ))}
                    <Route
                        path="/register"
                        element={
                            !isLoggedIn ? (
                                <Navigate to="/auth" />
                            ) : (
                                <Register storeCode={storeCode} />
                            )
                        }
                    />
                    <Route
                        path="/auth"
                        element={isLoggedIn ? <Navigate to="/" /> : <Auth />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            {deletingProduct && (
                <Confirm confirmObj={deletingProduct} storeCode={storeCode} />
            )}
            {isLoggedIn && <Navigation />}
        </BrowserRouter>
    );
};

export default AppRouter;
