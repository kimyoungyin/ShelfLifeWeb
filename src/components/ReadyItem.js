import React, { useState } from "react";
import "../css/Nweet.css";
import {
    productsActions,
    productsModes,
    validateAndChangeEditingProduct,
} from "Redux-store/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "hooks/useInput";
import { Button, TextField } from "@mui/material";

const ReadyItem = ({ mode, itemObj, storeCode }) => {
    const [count, setCount] = useState(0);
    const [editingInput] = useInput(itemObj.text);
    const { errorMessage, isError } = useSelector((state) => state.error);
    const { editingProduct, readyProducts } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(
            validateAndChangeEditingProduct(
                itemObj,
                editingInput.value,
                storeCode,
                readyProducts
            )
        );
    };

    const addCountHandler = () => {
        if (mode !== productsModes.ADD) return;
        setCount(count + 1);
        dispatch(
            productsActions.addCart({
                text: itemObj.text,
                count: count + 1,
                when: Date.now(),
            })
        );
    };

    const resetCount = () => {
        setCount(0);
        dispatch(productsActions.resetItem(itemObj.text));
    };

    if (editingProduct === itemObj.text) {
        return (
            <form className="Nweet form" onSubmit={onSubmit}>
                <TextField
                    variant="filled"
                    id="required"
                    label="수정할 내용"
                    inputProps={{ maxLength: 20 }}
                    {...editingInput}
                    error={isError}
                    helperText={errorMessage}
                />
                <div>
                    <Button variant="outlined" type="submit" value="Update">
                        완료
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            dispatch(productsActions.changeEditingProduct(null))
                        }
                    >
                        취소
                    </Button>
                </div>
            </form>
        );
    } else if (mode === productsModes.EDIT) {
        return (
            <>
                <div className="Nweet edit">
                    <div>{itemObj.text}</div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="Nweet-button"
                        onClick={() =>
                            dispatch(
                                productsActions.changeEditingProduct(
                                    itemObj.text
                                )
                            )
                        }
                    >
                        변경
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className="Nweet-button"
                        onClick={() =>
                            dispatch(
                                productsActions.changeDeletingProductObj(
                                    itemObj
                                )
                            )
                        }
                    >
                        제거
                    </Button>
                </div>
            </>
        );
    } else if (mode === productsModes.ADD) {
        return (
            <div className="Nweet add">
                <div>{itemObj.text}</div>
                <Button
                    variant="contained"
                    color="primary"
                    className="Nweet-count"
                    onClick={addCountHandler}
                >
                    {count}개
                </Button>
                <Button variant="contained" onClick={resetCount}>
                    초기화
                </Button>
            </div>
        );
    } else {
        return (
            <div className="Nweet">
                <div>{itemObj.text}</div>
            </div>
        );
    }
};

export default React.memo(ReadyItem);
