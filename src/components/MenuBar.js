import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

const MenuBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                        진열기한 관리 시스템
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default MenuBar;
