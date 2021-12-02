import React, { useEffect, useState } from "react";
import Home from "components/Home";
import { dbService } from "fbase";
import { Button, ButtonGroup, Fab } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import "../css/Store.css";
import IntegratedAdfitComponent from "components/Adfit";

const Store = () => {
    const [storeCode, setStoreCode] = useState("");
    const [haveStore, setHaveStore] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [addStart, setAddStart] = useState(false);

    useEffect(() => {
        const getLS = () => {
            if (localStorage.getItem("storeCode") !== null) {
                setStoreCode(JSON.parse(localStorage.getItem("storeCode")));
                setHaveStore(true);
            }
        };
        getLS();
        return () => {
            setHaveStore(false);
        };
    }, []);

    const setLS = () => {
        localStorage.setItem("storeCode", JSON.stringify(storeCode));
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setStoreCode(value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setLS();
        setHaveStore(true);
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const toggleAddMode = async () => {
        const addList = JSON.parse(localStorage.getItem("addList"));
        if (addStart === false) {
            setAddStart(true);
        } else if (addList === null || addList.length === 0) {
            alert("진열할 제품을 선택해주세요");
        } else {
            try {
                const currentList = await (
                    await dbService.collection(storeCode).doc("onSale").get()
                ).data().list;
                const result = currentList.concat(addList);
                await dbService.collection(storeCode).doc("onSale").set({
                    list: result,
                });
            } catch (e) {
                await dbService.collection(storeCode).doc("onSale").set({
                    list: addList,
                });
            }
            localStorage.removeItem("addList");
            setAddStart(false);
        }
    };

    const cancelAddMode = () => {
        localStorage.removeItem("addList");
        setAddStart(false);
    };

    return (
        <div className="Store">
            {haveStore ? (
                <>
                    <Home
                        addStart={addStart}
                        editMode={editMode}
                        storeCode={storeCode}
                    />
                    {!editMode && !addStart && (
                        <ButtonGroup
                            className="Store-buttons"
                            variant="contained"
                        >
                            <Button onClick={toggleEditMode} color="secondary">
                                수정하기
                            </Button>
                            <Button onClick={toggleAddMode} color="primary">
                                진열하기
                            </Button>
                        </ButtonGroup>
                    )}
                    {addStart && (
                        <ButtonGroup
                            className="Store-buttons"
                            variant="contained"
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={toggleAddMode}
                            >
                                진열
                            </Button>
                            <Button variant="contained" onClick={cancelAddMode}>
                                취소
                            </Button>
                        </ButtonGroup>
                    )}
                    {editMode && (
                        <ButtonGroup
                            className="Store-buttons"
                            variant="contained"
                            color="secondary"
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={toggleEditMode}
                            >
                                수정완료
                            </Button>
                        </ButtonGroup>
                    )}
                </>
            ) : (
                <>
                    <form className="Store-code" onSubmit={onSubmit}>
                        <input
                            value={storeCode}
                            onChange={onChange}
                            type="text"
                            placeholder="매장코드"
                        />
                        <Fab
                            size="small"
                            type="submit"
                            color="secondary"
                            aria-label="add"
                        >
                            <PlayArrowIcon />
                        </Fab>
                    </form>
                    <div className="Store-explain">
                        <h3 className="Store-explain-title">
                            입력된 매장코드는 아래 두 가지 중 한 가지를 수행하게
                            됩니다.
                        </h3>
                        <h3 className="Store-explain-warning">
                            주의 : 코드를 공유한 매장 직원 외 다른 사람이
                            접속하지 못하도록 복잡하게 설정해주세요
                            <br />
                            (예시: "매장명"(단순) / "gteg매장명sdfs(복잡)")
                        </h3>
                        <h3>1) 매장코드 새로 생성합니다.</h3>
                        매장 내에서 사용할 독특한 코드를 생성합니다. 직원들과
                        코드를 공유하세요
                        <br />
                        <h3>2) 공유된 매장코드로 접속합니다.</h3>
                        진열상품을 같은 같은 코드로 접속하여, 매장 직원들과
                        공동으로 진열기한을 관리하세요
                        <div className="Store-Adfit">
                            <IntegratedAdfitComponent />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Store;
