import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "Redux-store/auth-slice";
import { errorReducer } from "Redux-store/error-slice";
import { introReducer } from "Redux-store/intro-slice";
import { navigationReducer } from "Redux-store/navigation-slice";
import { productsReducer } from "Redux-store/products-slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
        intro: introReducer,
        error: errorReducer,
        products: productsReducer,
    },
});
