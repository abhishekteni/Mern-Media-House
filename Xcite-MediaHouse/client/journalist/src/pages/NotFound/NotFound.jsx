import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ListSubheader from "@mui/material/ListSubheader";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const NotFound = () => {
  return (
    <div className="NotFound">
      {" "}
      <Navbar />
      <div className="listContainer">
        <ListSubheader component="div" className="Pending_title">
          <div
            classname="regist_msg"
            style={{
              background: "rgba(34, 255, 5, 0.164)",
              width: "100%",
              height: "90vh",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                fontSize: "200px",
                marginBottom: "40px",
              }}
            >
              4 0 4
            </h1>
            <h1>Page Not Found </h1>
          </div>
        </ListSubheader>
      </div>
    </div>
  );
};

export default NotFound;
