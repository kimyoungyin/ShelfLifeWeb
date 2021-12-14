import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { errorReducer } from "./error-slice";
import { introReducer } from "./intro-slice";
import { navigationReducer } from "./navigation-slice";
import { productsReducer } from "./products-slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
        intro: introReducer,
        error: errorReducer,
        products: productsReducer,
    },
});
