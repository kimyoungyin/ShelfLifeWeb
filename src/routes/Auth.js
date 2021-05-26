import { Button, TextField } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import IntegratedAdfitComponent from "components/Adfit";
import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import "../css/Auth.css";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setError(false);
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (err) {
            setError(true);
            if (err.message === "The email address is badly formatted.") {
                setErrorMessage("이메일 양식이 올바르지 않습니다.");
            } else if (
                err.message ===
                "The email address is already in use by another account."
            ) {
                setErrorMessage("이미 같은 이메일의 계정이 있습니다.");
            } else if (
                err.message ===
                "There is no user record corresponding to this identifier. The user may have been deleted."
            ) {
                setErrorMessage("계정이 존재하지 않습니다");
            } else if (
                err.message ===
                "The password is invalid or the user does not have a password."
            ) {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
            } else if (
                err.message === "Password should be at least 6 characters"
            ) {
                setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialGoogleClick = async () => {
        let provider;
        try {
            setError(false);
            provider = new firebaseInstance.auth.GoogleAuthProvider();
            const data = await authService.signInWithPopup(provider);
            console.log(data);
        } catch (err) {
            setError(true);
            if (
                err.message ===
                "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
            ) {
                setErrorMessage("이미 같은 이메일의 계정이 있습니다");
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    const onSocialGithubClick = async () => {
        let provider;
        try {
            setError(false);
            provider = new firebaseInstance.auth.GithubAuthProvider();
            const data = await authService.signInWithPopup(provider);
            console.log(data);
        } catch (err) {
            setError(true);
            if (
                err.message ===
                "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
            ) {
                setErrorMessage("이미 같은 이메일의 계정이 있습니다");
            } else {
                setErrorMessage(err.message);
            }
        }
    };

    return (
        <div className="Auth">
            <div className="Auth-title">
                {newAccount ? "간단한 회원가입" : "로그인"}
            </div>
            <form onSubmit={onSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    variant="outlined"
                    onChange={onChange}
                    value={email}
                    error={error}
                    required={true}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    onChange={onChange}
                    value={password}
                    error={error}
                    helperText={errorMessage}
                    required={true}
                />
                <button className="Auth-submit" type="submit">
                    {newAccount ? "계정 생성" : "로그인하기"}
                </button>
                {error}
            </form>
            <button className="Auth-toggle" onClick={toggleAccount}>
                {newAccount
                    ? "계정이 있어요(로그인)"
                    : "계정이 아직 없어요(회원가입)"}
            </button>
            <div className="Auth-social" variant="contained">
                <Button
                    name="google"
                    variant="contained"
                    color="primary"
                    onClick={onSocialGoogleClick}
                >
                    구글 계정으로 시작하기
                </Button>
                <Button
                    name="github"
                    variant="contained"
                    color="secondary"
                    onClick={onSocialGithubClick}
                >
                    <GitHubIcon />
                    &nbsp; 깃허브 계정으로 시작하기
                </Button>
                <div className="Auth-Adfit">
                    <IntegratedAdfitComponent />
                </div>
            </div>
        </div>
    );
};
export default Auth;
