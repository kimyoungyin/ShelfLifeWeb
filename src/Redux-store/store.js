import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { errorReducer } from "./error-slice";
import { introReducer } from "./intro-slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        intro: introReducer,
        error: errorReducer,
    },
});
