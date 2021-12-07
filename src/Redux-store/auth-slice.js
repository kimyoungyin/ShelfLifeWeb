import { createSlice } from "@reduxjs/toolkit";
import { authService, firebaseInstance } from "fbase";
import { dispatchError, errorActions } from "./error-slice";

// extract function
const extractUserObj = (data) => ({
    displayName: data.user.displayName,
    uid: data.user.uid,
    email: data.user.email,
});

// const value
export const authModes = {
    LOGIN: "로그인",
    SIGNUP: "회원가입",
};

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false, user: null, mode: authModes.LOGIN },
    reducers: {
        login: (state, action) => {
            if (state.isLoggedIn) return state;
            return {
                isLoggedIn: true,
                user: action.payload,
                mode: state.mode,
            };
        },
        logout: (state) => {
            if (!state.isLoggedIn) return state;
            authService.signOut();
            state = { isLoggedIn: false, user: null, mode: authModes.LOGIN };
        },
        toggleAuthMode: (state) => {
            if (state.mode === authModes.LOGIN) {
                state.mode = authModes.SIGNUP;
            } else if (state.mode === authModes.SIGNUP) {
                state.mode = authModes.LOGIN;
            } else {
                return state;
            }
        },
    },
});

// reducer
export const authReducer = authSlice.reducer;

// actions
export const authActions = authSlice.actions;

// action-creator
export const defaultAuth = ({ email, password, mode }) => {
    return async (dispatch) => {
        let data;
        try {
            if (mode === authModes.LOGIN) {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            } else if (mode === authModes.SIGNUP) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            }
            dispatch(authActions.login(extractUserObj(data)));
        } catch (error) {
            dispatchError(error, dispatch);
        }
    };
};

export const googleLogin = () => {
    return async (dispatch) => {
        try {
            dispatch(errorActions.off());
            const provider = new firebaseInstance.auth.GoogleAuthProvider();
            const data = await authService.signInWithPopup(provider);
            dispatch(authActions.login(extractUserObj(data)));
        } catch (error) {
            dispatchError(error, dispatch);
        }
    };
};

export const githubLogin = () => {
    return async (dispatch) => {
        try {
            dispatch(errorActions.off());
            const provider = new firebaseInstance.auth.GithubAuthProvider();
            const data = await authService.signInWithPopup(provider);
            dispatch(authActions.login(extractUserObj(data)));
        } catch (error) {
            console.log(error);
            dispatchError(error, dispatch);
        }
    };
};
