import React from "react";
import Home from "components/Home";

import { Button, ButtonGroup } from "@material-ui/core";
import "css/Store.css";
import { useDispatch, useSelector } from "react-redux";
import {
    productsActions,
    productsModes,
    startSellingProducts,
} from "Redux-store/products-slice";

const Store = ({ storeCode }) => {
    const { mode, productsCart } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const changeMode = (mode) => {
        dispatch(productsActions.changeMode(mode));
    };

    const postItemListHandler = () => {
        dispatch(startSellingProducts(productsCart, storeCode));
    };

    return (
        <div className="Store">
            <>
                <Home mode={mode} storeCode={storeCode} />
                {mode === productsModes.DEFAULT && (
                    <ButtonGroup className="Store-buttons" variant="contained">
                        <Button
                            onClick={() => changeMode(productsModes.EDIT)}
                            color="secondary"
                        >
                            수정하기
                        </Button>
                        <Button
                            onClick={() => changeMode(productsModes.ADD)}
                            color="primary"
                        >
                            진열하기
                        </Button>
                    </ButtonGroup>
                )}
                {mode === productsModes.ADD && (
                    <ButtonGroup className="Store-buttons" variant="contained">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={postItemListHandler}
                        >
                            진열
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => changeMode(productsModes.DEFAULT)}
                        >
                            취소
                        </Button>
                    </ButtonGroup>
                )}
                {mode === productsModes.EDIT && (
                    <ButtonGroup
                        className="Store-buttons"
                        variant="contained"
                        color="secondary"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => changeMode(productsModes.DEFAULT)}
                        >
                            수정완료
                        </Button>
                    </ButtonGroup>
                )}
            </>
        </div>
    );
};

export default Store;
