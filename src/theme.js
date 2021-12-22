import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#7b1fa2",
        },
        secondary: {
            main: "#fbc02d",
        },
        background: {
            default: "#eeeefb",
        },
        error: {
            main: "#f44336",
        },
        success: {
            main: "#00e676",
        },
        black: {
            main: "#24292F",
            contrastText: "#fff", // text color
        },
    },
    // typography: {
    //     h2: {
    //         fontFamily: "Open Sans",
    //     },
    //     h6: {
    //         fontFamily: "Jua",
    //     },
    // },
});
