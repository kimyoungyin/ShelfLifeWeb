import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: { errorMessage: "", isError: false },
    reducers: {
        on: (state, action) => {
            return { errorMessage: action.payload, isError: true };
        },
        off: (state) => {
            return { errorMessage: "", isError: false };
        },
    },
});

export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;

// thunk 아님
export const dispatchError = (error, dispatch) => {
    if (error.message === "The email address is badly formatted.") {
        dispatch(errorActions.on("이메일 양식이 올바르지 않습니다."));
    } else if (
        error.message ===
        "The email address is already in use by another account."
    ) {
        dispatch(errorActions.on("이미 같은 이메일의 계정이 있습니다."));
    } else if (
        error.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
        dispatch(errorActions.on("계정이 존재하지 않습니다"));
    } else if (
        error.message ===
        "The password is invalid or the user does not have a password."
    ) {
        dispatch(errorActions.on("비밀번호가 일치하지 않습니다."));
    } else if (error.message === "Password should be at least 6 characters") {
        dispatch(errorActions.on("비밀번호는 최소 6자 이상이어야 합니다."));
    } else if (
        error.message ===
        "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
    ) {
        // console.log("여기에요!");
        dispatch(errorActions.on("이미 같은 이메일의 계정이 있습니다"));
    } else {
        dispatch(errorActions.on(error.message));
    }
};
