import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { CircularProgress } from "@material-ui/core";
import "../css/App.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <div id="App-loading">
          <CircularProgress />
          <div>개발자 : 케와와</div>
        </div>
      )}
    </div>
  );
}

export default App;
