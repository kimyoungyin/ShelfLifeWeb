import React, { useEffect, useState } from "react";
import Home from "components/Home";
import { dbService } from "fbase";
import { Button, ButtonGroup } from "@material-ui/core";
import "../css/Store.css";

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
          <Home addStart={addStart} editMode={editMode} storeCode={storeCode} />
          {!editMode && !addStart && (
            <ButtonGroup className="Store-buttons" variant="contained">
              <Button onClick={toggleEditMode} color="secondary">
                수정하기
              </Button>
              <Button onClick={toggleAddMode} color="primary">
                진열하기
              </Button>
            </ButtonGroup>
          )}
          {addStart && (
            <ButtonGroup className="Store-buttons" variant="contained">
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
        <form onSubmit={onSubmit}>
          <input
            value={storeCode}
            onChange={onChange}
            type="text"
            placeholder="매장에서만 사용할 독특한 코드를 지정(혹은 선택)해주세요"
          />
          <input type="submit" value="제출" name="Store" />
        </form>
      )}
    </div>
  );
};

export default Store;
