import { useInput } from "hooks/useInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    authActions,
    authModes,
    defaultAuth,
    githubLogin,
    googleLogin,
} from "Redux-store/auth-slice";
import { errorActions } from "Redux-store/error-slice";
import { Button, Divider, TextField } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import "css/Auth.css";

const Auth = () => {
    const { isError, errorMessage } = useSelector((state) => state.error);
    const authMode = useSelector((state) => state.auth.mode);
    const dispatch = useDispatch();
    const [emailInput] = useInput("");
    const [passwordInput] = useInput("");

    useEffect(() => {
        dispatch(errorActions.off());
    }, [emailInput.value, passwordInput.value, dispatch]);

    const defaultAuthSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(
            defaultAuth({
                email: emailInput.value,
                password: passwordInput.value,
                mode: authMode,
            })
        );
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
                    {...emailInput}
                    placeholder={
                        authMode === authModes.SIGNUP
                            ? "비밀번호를 찾을 떄 쓰이므로, 꼭 유효한 이메일을 작성해주세요"
                            : ""
                    }
                    error={isError}
                    required={true}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    {...passwordInput}
                    placeholder={
                        authMode === authModes.SIGNUP
                            ? "8~20자 사이, 특수문자 포함, 공백 없이 입력"
                            : ""
                    }
                    error={isError}
                    helperText={errorMessage}
                    required={true}
                />
                <Button
                    variant="contained"
                    className="Auth-submit"
                    type="submit"
                >
                    {authMode === authModes.SIGNUP ? "계정 생성" : "로그인하기"}
                </Button>
            </form>
            <Button
                variant="text"
                className="Auth-toggle"
                onClick={toggleAccount}
            >
                {authMode === authModes.SIGNUP
                    ? "계정이 있어요(로그인)"
                    : "계정이 아직 없어요(회원가입)"}
            </Button>
            <Divider>SOCIAL LOGIN</Divider>
            <div className="Auth-social" variant="contained">
                <Button
                    name="google"
                    variant="outlined"
                    color="black"
                    onClick={socialGoogleAuthHandler}
                >
                    <GoogleIcon />
                    &nbsp; 구글 계정으로 시작하기
                </Button>
                <Button
                    name="github"
                    variant="contained"
                    color="black"
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
