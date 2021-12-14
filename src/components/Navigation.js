import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AlarmIcon from "@material-ui/icons/Alarm";
import { LocalConvenienceStore } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { navigationActions } from "Redux-store/navigation-slice";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        height: 50,
    },
});

const Navigation = () => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const currentRoute = useSelector((state) => state.navigation);
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        dispatch(navigationActions.changeActiveNavigation(newValue));
    };

    useEffect(() => {
        if (pathname !== currentRoute) {
            dispatch(navigationActions.changeActiveNavigation(pathname));
        }
    }, [currentRoute, dispatch, pathname]);

    return (
        <BottomNavigation
            value={currentRoute}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                component={Link}
                exact="true"
                to="/"
                replace
                className="Navigation-link"
                label="진열가능"
                value="/"
                icon={<PlaylistAddIcon />}
            />

            <BottomNavigationAction
                component={Link}
                to="/onSale"
                replace
                className="Navigation-link"
                label="진열중"
                value="/onSale"
                icon={<AlarmIcon />}
            />

            <BottomNavigationAction
                component={Link}
                to="/profile"
                replace
                className="Navigation-link"
                label="내정보"
                value="/profile"
                icon={<PersonIcon />}
            />
            <BottomNavigationAction
                component={Link}
                to="/register"
                replace
                className="Navigation-link"
                label="매장코드 변경"
                value="/register"
                icon={<LocalConvenienceStore />}
            />
        </BottomNavigation>
    );
};

export default Navigation;
