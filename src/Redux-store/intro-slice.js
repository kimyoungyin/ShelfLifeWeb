import { createSlice } from "@reduxjs/toolkit";

const introInitialState = {
    isSeen: JSON.parse(localStorage.getItem("isSeen")),
    currentIndex: 0,
};

export const introSlice = createSlice({
    name: "intro",
    initialState: introInitialState,
    reducers: {
        saw: (state) => {
            if (state.saw) return state;
            localStorage.setItem("isSeen", true);
            state.isSeen = true;
        },
        unsight: (state) => {
            if (!state.saw) return state;
            localStorage.setItem("isSeen", false);
            state.isSeen = false;
        },
        next: (state) => {
            if (state.currentIndex === 8) return state;
            state.currentIndex++;
        },
        prev: (state) => {
            if (state.currentIndex === 0) return state;
            state.currentIndex--;
        },
    },
});

// reducer
export const introReducer = introSlice.reducer;

// actions
export const introActions = introSlice.actions;
