import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { CircularProgress } from "@material-ui/core";
import "../css/App.css";
import Intro from "./Intro";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    const [sawIntro, setSawIntro] = useState(false);

    useEffect(() => {
        let checkIntro = JSON.parse(localStorage.getItem("sawIntro"));
        if (checkIntro !== null) {
            setSawIntro(true);
            authService.onAuthStateChanged((user) => {
                if (user) {
                    setIsLoggedIn(true);
                    setUserObj({
                        displayName: user.displayName,
                        uid: user.uid,
                        email: user.email,
                    });
                } else {
                    setIsLoggedIn(false);
                }
                setInit(true);
            });
        }

        return () => {
            setSawIntro(false);
        };
    }, []);

    const introOut = () => {
        setSawIntro(true);
        localStorage.setItem("sawIntro", true);
    };

    return (
        <div className="App">
            {sawIntro ? (
                <>
                    {init ? (
                        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
                    ) : (
                        <div id="App-loading">
                            <CircularProgress />
                            <div>개발자 : 케와와</div>
                        </div>
                    )}
                </>
            ) : (
                <Intro introOut={introOut} />
            )}
        </div>
    );
}

export default App;
