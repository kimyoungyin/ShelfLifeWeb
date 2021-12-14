import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
