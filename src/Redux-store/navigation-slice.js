import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: "/",
    reducers: {
        changeActiveNavigation: (state, action) => {
            return action.payload;
        },
    },
});

export const navigationReducer = navigationSlice.reducer;

export const navigationActions = navigationSlice.actions;
