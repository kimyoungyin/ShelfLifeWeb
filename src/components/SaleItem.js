import { Button } from "@material-ui/core";
import { dbService } from "fbase";
import React, { useState } from "react";
import "../css/SaleItem.css";

const SaleItem = ({ itemObj, time, onSales }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [inputNumber, setInputNumber] = useState(itemObj.count);
  const storeCode = JSON.parse(localStorage.getItem("storeCode"));
  const gap = time - itemObj.when;

  const getTime = (gap) => {
    let hours = Math.floor(gap / (1000 * 60 * 60));
    let minutes = Math.floor((gap / (1000 * 60)) % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours} 시간 ${minutes} 분`;
  };

  const toggleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputNumber(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setDeleteMode(false);
    if (Number(inputNumber) === itemObj.count) {
      onSales.splice(onSales.indexOf(itemObj), 1);
      await dbService.collection(storeCode).doc("onSale").set({
        list: onSales,
      });
    } else if (Number(inputNumber) <= itemObj.count) {
      let newObj = itemObj;
      newObj.count = itemObj.count - Number(inputNumber);
      onSales.splice(onSales.indexOf(itemObj), 1, newObj);
      await dbService.collection(storeCode).doc("onSale").set({
        list: onSales,
      });
    }
  };

  const timeStyle = () => {
    if (gap > 43200000) {
      return "#ffebee";
    } else if (gap > 21600000) {
      return "#e8eaf6";
    } else {
      return "#ffffff";
    }
  };

  return (
    <>
      {!deleteMode ? (
        <div
          className="SaleItem"
          style={{ background: timeStyle() }}
          onClick={toggleDeleteMode}
        >
          <div className="SaleItem-text">{itemObj.text}</div>
          <div className="SaleItem-content">
            <div>{itemObj.count}개</div>
            <div>
              진열한 지 <span>{getTime(gap)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="SaleItem">
          <div>{itemObj.text}</div>
          <form onSubmit={onSubmit} className="SaleItem-Form">
            <input
              autoFocus
              type="number"
              min="1"
              max={itemObj.count}
              value={inputNumber}
              onChange={onChange}
            />
            <Button variant="outlined" color="secondary" type="submit">
              개 제거
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleDeleteMode}
            >
              취소
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
export default SaleItem;
