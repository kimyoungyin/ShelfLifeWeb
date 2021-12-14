import { Button } from "@material-ui/core";
import useGapText from "hooks/useGapText";
import { useInput } from "hooks/useInput";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorActions } from "Redux-store/error-slice";
import { deleteSoldProduct, productsActions } from "Redux-store/products-slice";
import "../css/SaleItem.css";

const SaleItem = ({ itemObj, time, storeCode }) => {
    const handlingSellingProductObj = useSelector(
        (state) => state.products.handlingSellingProductObj
    );
    const [numberInput] = useInput(itemObj.count);
    const gap = time - itemObj.when;
    const gapText = useGapText(gap);
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        const restNumber = itemObj.count - numberInput.value;
        if (restNumber < 0)
            return dispatch(errorActions.on("판매중인 수량보다 많습니다."));
        dispatch(deleteSoldProduct(storeCode, itemObj, restNumber));
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
            {handlingSellingProductObj !== itemObj ? (
                <div
                    className="SaleItem"
                    style={{ background: timeStyle() }}
                    onClick={() =>
                        dispatch(
                            productsActions.changeHandlingSellingProductObj(
                                itemObj
                            )
                        )
                    }
                >
                    <div className="SaleItem-text">{itemObj.text}</div>
                    <div className="SaleItem-content">
                        <div>{itemObj.count}개</div>
                        <div>
                            진열한 지 <span>{gapText}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="SaleItem">
                    <div>{itemObj.text}</div>
                    <form onSubmit={submitHandler} className="SaleItem-Form">
                        <input
                            autoFocus
                            type="number"
                            min="1"
                            max={itemObj.count}
                            {...numberInput}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="submit"
                        >
                            개 제거
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                                dispatch(
                                    productsActions.changeHandlingSellingProductObj(
                                        null
                                    )
                                )
                            }
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
