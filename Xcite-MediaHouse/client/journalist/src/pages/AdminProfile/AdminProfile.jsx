import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./AdminProfile.scss";
import { Link } from "react-router-dom";
import { List } from "@mui/material";
const AdminProfile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);
  return (
    <div className="AdminProfile">
      <Sidebar />
      <div className="AdminProfileContainer">
        <Navbar />
        <div className="top">
          <h1>Admin Profile</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="AdminbackgroundColor">
              <img src={userInfo.avatar} alt="" />
            </div>
          </div>
          <div className="right">
            {" "}
            <div className="profile_text">
              <Typography variant="h3" gutterBottom component="div">
                <b>{userInfo.name}</b>
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Author
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <EmailIcon style={{ color: "blue" }} />
                {userInfo.email}
                {userInfo.admin == true ? (
                  <AdminPanelSettingsIcon style={{ color: "limegreen" }} />
                ) : (
                  <VerifiedUserIcon style={{ color: "orange" }} />
                )}

                {userInfo.admin == true ? "Admin" : "User"}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {userInfo.admin == true
                  ? "Admin has the authority to view statistics of the panel. Furthermore, admin has the command to change, update and admit any given profile on the panel. Lastly, even Admin can create and upload blogs on the server"
                  : "Users has the authority to view different profile and blogs.Secondly, users can change, update their respective profile without any intervention from the admin. However, only selected users can write a blog on the server. "}
              </Typography>
              <Link
                to={`/users/${userInfo.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained">View profile</Button>
              </Link>
            </div>
            <div className="right_box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
