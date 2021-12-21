import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
    deleteReadyProduct,
    productsActions,
} from "Redux-store/products-slice";

const Confirm = ({ confirmObj, storeCode }) => {
    const dispatch = useDispatch();
    const closeHandler = () =>
        dispatch(productsActions.changeDeletingProductObj(null));

    const deleteHandler = () => {
        dispatch(deleteReadyProduct(confirmObj, storeCode));
    };
    return (
        <Dialog
            open={confirmObj !== null}
            onClose={closeHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                이 제품을 진열가능제품 목록에서 제거하겠습니까?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    제거된 제품은 진열할 수 없습니다.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandler} color="primary">
                    취소
                </Button>
                <Button onClick={deleteHandler} color="primary" autoFocus>
                    제거
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;
