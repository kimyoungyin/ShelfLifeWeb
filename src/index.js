import { ThemeProvider } from "@material-ui/styles";
import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import { theme } from "theme";
import "./css/index.css";
ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
