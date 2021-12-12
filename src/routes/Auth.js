import { Button, TextField } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    authActions,
    authModes,
    defaultAuth,
    githubLogin,
    googleLogin,
} from "Redux-store/auth-slice";
import "../css/Auth.css";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isError, errorMessage } = useSelector((state) => state.error);
    const authMode = useSelector((state) => state.auth.mode);
    const dispatch = useDispatch();
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const defaultAuthSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(defaultAuth({ email, password, mode: authMode }));
    };

    const toggleAccount = () => dispatch(authActions.toggleAuthMode());

    const socialGoogleAuthHandler = () => {
        dispatch(googleLogin());
    };

    const socialGithubAuthHandler = () => {
        dispatch(githubLogin());
    };

    return (
        <div className="Auth">
            <div className="Auth-title">{authMode}</div>
            <form onSubmit={defaultAuthSubmitHandler}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    variant="outlined"
                    onChange={onChange}
                    value={email}
                    error={isError}
                    required={true}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    onChange={onChange}
                    value={password}
                    error={isError}
                    helperText={errorMessage}
                    required={true}
                />
                <button className="Auth-submit" type="submit">
                    {authMode === authModes.SIGNUP ? "계정 생성" : "로그인하기"}
                </button>
            </form>
            <button className="Auth-toggle" onClick={toggleAccount}>
                {authMode === authModes.SIGNUP
                    ? "계정이 있어요(로그인)"
                    : "계정이 아직 없어요(회원가입)"}
            </button>
            <div className="Auth-social" variant="contained">
                <Button
                    name="google"
                    variant="contained"
                    color="primary"
                    onClick={socialGoogleAuthHandler}
                >
                    구글 계정으로 시작하기
                </Button>
                <Button
                    name="github"
                    variant="contained"
                    color="secondary"
                    onClick={socialGithubAuthHandler}
                >
                    <GitHubIcon />
                    &nbsp; 깃허브 계정으로 시작하기
                </Button>
            </div>
        </div>
    );
};
export default Auth;
