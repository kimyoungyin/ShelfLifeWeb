import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import "../css/Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
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
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (err) {
      if (
        err.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        setError("계정이 존재하지 않습니다");
      } else if (
        err.message ===
        "The password is invalid or the user does not have a password."
      ) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError(err.message);
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
    } catch (err) {
      if (
        err.message ===
        "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
      ) {
        setError("이미 같은 이메일의 계정이 있습니다");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="Auth">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
