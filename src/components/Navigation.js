import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AlarmIcon from "@material-ui/icons/Alarm";

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
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        exact="true"
        to="/"
        replace
        className="Navigation-link"
        label="진열가능"
        value="Store"
        icon={<PlaylistAddIcon />}
      />

      <BottomNavigationAction
        component={Link}
        to="/OnSale"
        replace
        className="Navigation-link"
        label="진열중"
        value="OnSale"
        icon={<AlarmIcon />}
      />

      <BottomNavigationAction
        component={Link}
        to="/profile"
        replace
        className="Navigation-link"
        label="내정보"
        value="Profile"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
};

export default Navigation;
