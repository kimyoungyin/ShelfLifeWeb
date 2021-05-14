import Nweet from "components/Nweet";
import { dbService, firebaseInstance } from "fbase";
import React, { useEffect, useState } from "react";
import "../css/Home.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
  enroll: {
    display: "flex",
    alignItems: "center",
    "& > button": {
      marginLeft: "5px",
    },
  },
  search: {
    width: "80%",
    maxWidth: "600px",
    color: "#3F51B5",
    margin: "10px 0",
  },
  searchInput: {
    maxLength: 20,
    color: "#3F51B5",
  },
}));

const Home = ({ addStart, storeCode, editMode }) => {
  const classes = useStyles();
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [findInput, setFindInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dbService
        .collection(storeCode)
        .doc("Chickens")
        .onSnapshot((doc) => {
          try {
            const chickens = doc.data().list;
            chickens.sort((a, b) => {
              if (a.text > b.text) return 1;
              if (a.text < b.text) return -1;

              return 0;
            });
            setNweets(chickens);
          } catch (err) {
            console.log(err);
          }
        });
    };
    fetchData();
    return () => {
      setNweets([]);
    };
  }, [storeCode]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const checkInclude = (check, find) => {
    if (check === find) {
      return true;
    } else if (check !== find) {
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet === "") {
      setError(true);
      setErrorMessage("제품명을 입력해주세요");
    } else if (
      !nweets.map((obj) => checkInclude(obj.text, nweet)).includes(true)
    ) {
      try {
        await dbService
          .collection(storeCode)
          .doc("Chickens")
          .update({
            list: firebaseInstance.firestore.FieldValue.arrayUnion({
              id: Date.now(),
              text: nweet,
            }),
          });
      } catch {
        await dbService
          .collection(storeCode)
          .doc("Chickens")
          .set({
            list: firebaseInstance.firestore.FieldValue.arrayUnion({
              id: Date.now(),
              text: nweet,
            }),
          });
      }
      setNweet("");
      setErrorMessage("");
      setError(false);
    } else {
      setError(true);
      setErrorMessage("이미 등록된 제품입니다");
    }
  };

  const handleFindInput = (event) => {
    const {
      target: { value },
    } = event;
    setFindInput(value);
  };

  const filterFindInput = nweets.filter((item) => {
    return item.text.includes(findInput);
  });

  return (
    <div className="Home">
      <TextField
        label="진열가능 제품 검색"
        onChange={handleFindInput}
        value={findInput}
        inputProps={{ className: classes.searchInput }}
        className={classes.search}
        variant="outlined"
      />
      {editMode || addStart ? (
        <div className="Home-NweetList">
          {filterFindInput.map((nweet) => (
            <Nweet
              key={nweet.id}
              editMode={editMode}
              addStart={addStart}
              nweetObj={nweet}
              storeCode={storeCode}
              chickens={nweets}
            />
          ))}
        </div>
      ) : (
        <>
          <form
            className={classes.enroll}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              id="required"
              label="진열가능 제품 등록"
              inputProps={{ className: classes.searchInput }}
              onChange={onChange}
              value={nweet}
              error={error}
              helperText={errorMessage}
            />
            <Fab size="small" type="submit" color="secondary" aria-label="add">
              <AddIcon />
            </Fab>
          </form>

          <div className="Home-NweetList">
            {filterFindInput.map((nweet) => (
              <Nweet
                key={nweet.id}
                editMode={editMode}
                nweetObj={nweet}
                storeCode={storeCode}
                chickens={nweets}
                addStart={addStart}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
