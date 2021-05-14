import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Confirm = ({ open, onDeleteClick }) => {
  return (
    <div style={{ position: "fixed" }}>
      <Dialog
        open={open}
        onClose={onDeleteClick}
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
          <Button onClick={onDeleteClick} color="primary">
            취소
          </Button>
          <Button onClick={onDeleteClick} color="primary" autoFocus>
            제거
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
