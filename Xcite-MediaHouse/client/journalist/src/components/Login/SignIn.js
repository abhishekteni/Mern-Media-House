import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";

import axios from "axios";
import {
  getError,
  getLoading,
  getSuccess,
  getUserInfo,
} from "../../redux/action/userAction";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function SignIn() {
  const paperStyle = { padding: "30px 20px", width: "380px" };
  const StyleVisible = styled.div`
    &:hover {
      cursor: pointer;
    }
  `;
  const StyleForgot = styled.div`
    color: #139487;
    cursor: pointer;
  `;
  const StyleNewUser = styled.div`
    margin-left: 10px;
    color: #139487;
    cursor: pointer;
  `;

  const [show, setShow] = useState(false);
  const [goToRecovery, setGoToRecovery] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    dispatch(getLoading(true));
    const body = JSON.stringify({
      email: userData.email,
      password: userData.password,
    });

    // User Login API
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v2/auth/journalist/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.token + "Helllo tokennnn");

        // dispatch(getLoading(false));
        dispatch(getSuccess(response.data.token));
        dispatch(
          getUserInfo({
            id: response.data.data._id,
            name: response.data.data.name,
            email: response.data.data.email,
            avatar: response.data.data.profilePicture,
            admin: response.data.data.isAdmin,
          })
        );
        dispatch(getError(""));
        toast.success("User Login Successfully.");
        navigate("/");
      })
      .catch((error) => {
        dispatch(getLoading(false));
        dispatch(getError(error));
        dispatch(getSuccess(""));
        toast.error("Invalid Email or Password");
        window.location.reload();
      });
  };

  return (
    <Grid>
      <Paper elevation={2} style={paperStyle}>
        <Grid>
          <Avatar
            style={{
              background: "#139487",
              margin: "auto",
              width: "56px",
              height: "56px",
            }}
          >
            <LockIcon />
          </Avatar>
          <h2>Sign In</h2>
          <Typography variant="standard">Welcome Back!!</Typography>
        </Grid>
        <form style={{ marginTop: "10px" }}>
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Email"
            onChange={(e) => {
              setUserData({
                email: e.target.value,
                password: userData.password,
              });
            }}
          />
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <TextField
              style={{ marginBottom: "10px" }}
              fullWidth
              label="Password"
              type={show ? "text" : "password"}
              onChange={(e) => {
                setUserData({
                  email: userData.email,
                  password: e.target.value,
                });
              }}
            />
            <StyleVisible
              style={{
                position: "absolute",
                marginLeft: "300px",
                zIndex: "100",
              }}
              className="visibility"
              onClick={() => setShow(!show)}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </StyleVisible>
          </Grid>
          <Link to="/recovery" style={{ textDecoration: "none" }}>
            <StyleForgot
              onClick={() => setGoToRecovery(!goToRecovery)}
              varient="standard"
            >
              Forgot Password?
            </StyleForgot>
          </Link>
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#139487", margin: "10px 0" }}
            onClick={submit}
          >
            Sign In
          </Button>
        </form>
        <Divider />
        <div
          style={{ display: "flex", alignItems: "baseline" }}
          className="newUser"
        >
          <Typography style={{ marginTop: "10px" }} varient="standard">
            Don't have an account?
          </Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <StyleNewUser>Sign Up for free</StyleNewUser>
          </Link>
        </div>
      </Paper>
    </Grid>
  );
}

export default SignIn;
