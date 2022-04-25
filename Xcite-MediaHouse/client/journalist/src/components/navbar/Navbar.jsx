import React from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { getDarkmode } from "../../redux/action/extraAction";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";
import { searchFunc } from "../../pages/Apicall";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const authUser = useSelector((state) => state.userAuth.success);
  const darkmode = useSelector((state) => state.setDark.showDark);
  const dispatch = useDispatch();

  return (
    <>
      {authUser ? (
        <div className="navbar">
          <div className="wrapper">
            <div className="search">
              <input
                type="text"
                placeholder="search..."
                onClick={(e) => searchFunc(e.target.value)}
              />
              <SearchIcon />
            </div>

            <div className="items">
              <div className="item">
                <ExitToAppIcon className="icon" />
              </div>
              <div className="item">
                {darkmode ? (
                  <LightModeIcon
                    className="icon"
                    onClick={() => dispatch(getDarkmode(!darkmode))}
                  />
                ) : (
                  <DarkModeIcon
                    className="icon"
                    onClick={() => dispatch(getDarkmode(!darkmode))}
                  />
                )}
              </div>
              <div className="item">
                <Link to="/notification">
                  <NotificationAddIcon className="icon" />
                  <div className="counter">1</div>
                </Link>
              </div>
              <div className="item">
                {userInfo.admin == true ? (
                  <AdminPanelSettingsIcon
                    className="icon"
                    style={{ color: "limegreen", fontSize: "25px" }}
                  />
                ) : (
                  <VerifiedUserIcon
                    className="icon"
                    style={{ color: "orange", fontSize: "25px" }}
                  />
                )}
              </div>
              <div className="item">
                <Link to="/adminprofile">
                  <img src={userInfo.avatar} className="avatar" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="wrapper">
            <div className="q"></div>

            <div className="items">
              <div className="item"></div>
              <div className="item"></div>
              <div className="item">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    fontSize: "20px",
                  }}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
