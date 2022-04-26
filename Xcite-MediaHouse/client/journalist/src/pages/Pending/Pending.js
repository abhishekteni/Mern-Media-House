import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import "./Pending.scss";
import Navbar from "../../components/navbar/Navbar";
import ListSubheader from "@mui/material/ListSubheader";
const Pending = () => {
  return (
    <div className="Pending">
      <Navbar />
      <div className="listContainer">
        <ListSubheader component="div" className="Pending_title">
          <div
            style={{
              background: "rgba(34, 255, 5, 0.164)",
              width: "100%",
              height: "30vh",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CheckCircleOutlineIcon
              style={{ color: "green", fontSize: "60px" }}
            />
            <h1>You have successfully registered</h1>
          </div>

          <img
            className="waiting_image"
            src="https://i.gifer.com/origin/f5/f5baef4b6b6677020ab8d091ef78a3bc_w200.gif"
          />
          <div
            style={{
              display: "flex",
              width: "250px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <button className="Home_btn_waiting">Home </button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="Home_btn_waiting">Login </button>
            </Link>
          </div>
          <h1>Waiting for the approval</h1>
          <p>Please wait for 24hrs to get a response from the admin</p>
        </ListSubheader>
      </div>
    </div>
  );
};

export default Pending;
