import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
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
});
