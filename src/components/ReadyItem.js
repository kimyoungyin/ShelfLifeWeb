import { Button, TextField } from "@material-ui/core";
import { dbService } from "fbase";
import React, { useState } from "react";
import Confirm from "./Confirm";
import "../css/Nweet.css";

const ReadyItem = ({ addStart, chickens, itemObj, storeCode, editMode }) => {
    const [editing, setEditing] = useState(false);
    const [newItem, setNewItem] = useState(itemObj.text);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewItem(value);
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
        if (itemObj.text === newItem) {
            setError(true);
            setHelperText("기존 제품명과 같습니다.");
        } else if (
            chickens
                .map((obj) => checkInclude(obj.text, newItem))
                .includes(true)
        ) {
            setError(true);
            setHelperText("이미 같은 제품이 목록에 있습니다.");
        } else {
            setError(false);
            setHelperText("");
            setEditing(false);
            chickens.splice(chickens.indexOf(itemObj), 1, {
                id: itemObj.id,
                text: newItem,
            });
            await dbService.collection(storeCode).doc("Chickens").set({
                list: chickens,
            });
        }
    };

    const onDeleteClick = async (event) => {
        const {
            target: { innerHTML },
        } = event;
        if (open === false) {
            setOpen(true);
        } else if (innerHTML === "제거") {
            setOpen(false);
            chickens.splice(chickens.indexOf(itemObj), 1);
            await dbService.collection(storeCode).doc("Chickens").set({
                list: chickens,
            });
        } else {
            setOpen(false);
        }
    };

    const toggleUpdate = () => setEditing((prev) => !prev);

    const onSale = () => {
        setCount(count + 1);
        if (addStart) {
            try {
                const currentLS = JSON.parse(localStorage.getItem("addList"));
                const check = currentLS
                    .map((obj) => Object.values(obj).includes(itemObj.text))
                    .includes(true);
                setLS(currentLS, check);
            } catch (e) {
                const currentLS = JSON.parse(localStorage.getItem("addList"));
                const check = false;
                setLS(currentLS, check);
            }
        }
    };

    const setLS = (currentLS, check) => {
        if (currentLS === null) {
            localStorage.setItem(
                "addList",
                JSON.stringify([
                    { text: itemObj.text, count: count + 1, when: Date.now() },
                ])
            );
        } else if (check) {
            currentLS.splice(
                currentLS.findIndex((i) => i.text === itemObj.text),
                1,
                {
                    text: itemObj.text,
                    count: count + 1,
                    when: Date.now(),
                }
            );
            localStorage.setItem("addList", JSON.stringify(currentLS));
        } else if (!check) {
            currentLS.push({
                text: itemObj.text,
                count: count + 1,
                when: Date.now(),
            });
            localStorage.setItem("addList", JSON.stringify(currentLS));
        }
    };

    const resetCount = () => {
        try {
            const addList = JSON.parse(localStorage.getItem("addList"));
            const index = addList.findIndex((i) => i.text === itemObj.text);
            if (index !== -1) {
                addList.splice(index, 1);
                localStorage.setItem("addList", JSON.stringify(addList));
                setCount(0);
            }
        } catch {
            setCount(0);
        }
    };

    if (editing) {
        return (
            <form className="Nweet form" onSubmit={onSubmit}>
                <TextField
                    variant="filled"
                    id="required"
                    label="수정할 내용"
                    inputProps={{ maxLength: 20 }}
                    onChange={onChange}
                    value={newItem}
                    error={error}
                    helperText={helperText}
                />
                <div>
                    <Button variant="outlined" type="submit" value="Update">
                        완료
                    </Button>
                    <Button variant="outlined" onClick={toggleUpdate}>
                        취소
                    </Button>
                </div>
            </form>
        );
    } else if (editMode) {
        return (
            <div className="Nweet edit">
                <div>{itemObj.text}</div>
                <Button
                    variant="outlined"
                    color="primary"
                    className="Nweet-button"
                    onClick={toggleUpdate}
                >
                    변경
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className="Nweet-button"
                    onClick={onDeleteClick}
                >
                    제거
                </Button>
                <Confirm open={open} onDeleteClick={onDeleteClick} />
            </div>
        );
    } else if (addStart) {
        return (
            <div className="Nweet add">
                <div>{itemObj.text}</div>
                <Button
                    variant="contained"
                    color="primary"
                    className="Nweet-count"
                    onClick={onSale}
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

export default ReadyItem;