import { useEffect, useState } from "react";
import AppRouter from "Router";
import { authService } from "fbase";
import { CircularProgress } from "@material-ui/core";
import "./css/App.css";
import Intro from "./components/Intro";
import { useDispatch, useSelector } from "react-redux";
import { introActions } from "Redux-store/intro-slice";
import { authActions } from "Redux-store/auth-slice";

function App() {
    const [init, setInit] = useState(false);
    const isSeen = useSelector((state) => state.intro.isSeen);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSeen) {
            dispatch(introActions.saw());
            authService.onAuthStateChanged((user) => {
                if (user) {
                    const currentUser = {
                        displayName: user.displayName,
                        uid: user.uid,
                        email: user.email,
                    };
                    dispatch(authActions.login(currentUser));
                } else {
                    dispatch(authActions.logout());
                }
                setInit(true);
            });
        }
    }, [dispatch, isSeen]);

    const introOut = () => {
        dispatch(introActions.saw());
    };

    return (
        <div className="App">
            {isSeen ? (
                <>
                    {init ? (
                        <AppRouter />
                    ) : (
                        <div id="App-loading">
                            <CircularProgress />
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
