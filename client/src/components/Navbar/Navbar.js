import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useDispatch } from "react-redux";
import { logOut } from "../../actions/userActions";

const ProfileMenu = styled(Menu)`
  padding: 15px;
`;
const Nav = styled(AppBar)`
  background-color: lightgrey;
`;

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logOut(history));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Nav position="sticky" color="inherit">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon onClick={() => history.push("/home")} />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <h2 style={{ margin: "1vh" }}>Stephen Tsim</h2>
            <div
              style={{
                padding: "0 1vh 1vh 1vh",
                borderBottom: "1px solid black",
              }}
            >
              stephentsim.222@gmail.com
            </div>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </ProfileMenu>
        </div>
      </Toolbar>
    </Nav>
  );
};

export default Navbar;
