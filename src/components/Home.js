import ReadyItem from "components/ReadyItem";
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

const Home = ({ addStart, storeCode, editMode, onAddItemToList }) => {
    const classes = useStyles();
    const [item, setItem] = useState("");
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [findInput, setFindInput] = useState("");
    console.log("home is rerendered");
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
                        setItems(chickens);
                    } catch (err) {
                        console.log(err);
                    }
                });
        };
        fetchData();
        return () => {
            setItems([]);
        };
    }, [storeCode]);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setItem(value);
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
        if (item === "") {
            setError(true);
            setErrorMessage("제품명을 입력해주세요");
        } else if (
            !items.map((obj) => checkInclude(obj.text, item)).includes(true)
        ) {
            try {
                await dbService
                    .collection(storeCode)
                    .doc("Chickens")
                    .update({
                        list: firebaseInstance.firestore.FieldValue.arrayUnion({
                            id: Date.now(),
                            text: item,
                        }),
                    });
            } catch {
                await dbService
                    .collection(storeCode)
                    .doc("Chickens")
                    .set({
                        list: firebaseInstance.firestore.FieldValue.arrayUnion({
                            id: Date.now(),
                            text: item,
                        }),
                    });
            }
            setItem("");
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

    const filterFindInput = items.filter((item) => {
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
                        <ReadyItem
                            key={nweet.id}
                            editMode={editMode}
                            addStart={addStart}
                            itemObj={nweet}
                            storeCode={storeCode}
                            chickens={items}
                            onAddList={onAddItemToList}
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
                            value={item}
                            error={error}
                            helperText={errorMessage}
                        />
                        <Fab
                            size="small"
                            type="submit"
                            color="secondary"
                            aria-label="add"
                        >
                            <AddIcon />
                        </Fab>
                    </form>
                    <div className="Home-NweetList">
                        {filterFindInput.map((nweet) => (
                            <ReadyItem
                                key={nweet.id}
                                editMode={editMode}
                                itemObj={nweet}
                                storeCode={storeCode}
                                chickens={items}
                                addStart={addStart}
                                onAddList={onAddItemToList}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(Home);
