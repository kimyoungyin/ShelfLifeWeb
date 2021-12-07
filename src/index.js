import { ThemeProvider } from "@material-ui/styles";
import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { theme } from "theme";
import store from "./Redux-store/store";
import "./css/index.css";
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
