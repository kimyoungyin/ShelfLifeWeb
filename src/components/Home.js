import ReadyItem from "components/ReadyItem";
import { dbService, firebaseInstance } from "fbase";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { getReadyProducts, productsModes } from "Redux-store/products-slice";
import { useInput } from "hooks/useInput";
import "../css/Home.css";

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

const Home = ({ mode, storeCode }) => {
    const classes = useStyles();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchInput] = useInput("");
    const [addInput, resetAddInput] = useInput("");
    const readyProducts = useSelector((state) => state.products.readyProducts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReadyProducts(storeCode));
    }, [dispatch, storeCode]);

    const checkInclude = (check, find) => {
        if (check === find) {
            return true;
        } else if (check !== find) {
            return false;
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (addInput.value === "") {
            setError(true);
            setErrorMessage("제품명을 입력해주세요");
        } else if (
            !readyProducts
                .map((obj) => checkInclude(obj.text, addInput.value))
                .includes(true)
        ) {
            try {
                await dbService
                    .collection(storeCode)
                    .doc("Chickens")
                    .update({
                        list: firebaseInstance.firestore.FieldValue.arrayUnion({
                            id: Date.now(),
                            text: addInput.value,
                        }),
                    });
                resetAddInput();
                setErrorMessage("");
                setError(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            setError(true);
            setErrorMessage("이미 등록된 제품입니다");
        }
    };

    const filterFindInput = readyProducts.filter((item) => {
        return item.text.includes(searchInput.value);
    });

    return (
        <div className="Home">
            <TextField
                label="진열가능 제품 검색"
                {...searchInput}
                inputProps={{ className: classes.searchInput }}
                className={classes.search}
                variant="outlined"
            />
            {mode !== productsModes.DEFAULT ? (
                <div className="Home-NweetList">
                    {filterFindInput.map((product) => (
                        <ReadyItem
                            key={product.id}
                            mode={mode}
                            itemObj={product}
                            storeCode={storeCode}
                            chickens={readyProducts}
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
                            {...addInput}
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
                        {filterFindInput.map((product) => (
                            <ReadyItem
                                key={product.id}
                                itemObj={product}
                                storeCode={storeCode}
                                chickens={readyProducts}
                                mode={mode}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(Home);
