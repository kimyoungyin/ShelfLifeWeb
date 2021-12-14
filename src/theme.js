import { createTheme } from "@material-ui/core";

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
