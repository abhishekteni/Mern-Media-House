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
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getError, getSuccess } from "../../redux/action/userAction";
function Recovery() {
  const paperStyle = { padding: "30px 20px", width: "380px" };
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(20);
  const [disable, setDisable] = useState(false);
  const [joundata, SetjounData] = useState({
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    setShow(!show);
    if (counter > 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }

    const body = JSON.stringify({
      email: joundata.email,
    });

    // User Login API
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v2/joun/forgetPassword",
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
        // dispatch(
        //   getUserInfo({
        //     id: response.data.data._id,
        //     name: response.data.data.name,
        //     email: response.data.data.email,
        //     avatar: response.data.data.profilePicture,
        //   })
        // );
        // dispatch(getError(""));
        toast.success("recovery mail sent successfully.");
        navigate("/");
      })
      .catch((error) => {
        dispatch(getError(error));
        dispatch(getSuccess(""));
        toast.error("Invalid Email");
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
            <KeyIcon />
          </Avatar>
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            Reset Password
          </h2>
          <Typography
            style={{ display: "flex", justifyContent: "center" }}
            variant="caption"
          >
            No worries, we'll send you reset instruction
          </Typography>
        </Grid>
        <form style={{ marginTop: "10px" }}>
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Email"
            onChange={(e) => {
              SetjounData({
                email: e.target.value,
              });
            }}
          />
          <Button
            variant="contained"
            style={{
              background: "#139487",
              marginTop: "20px",
              width: "100%",
            }}
            disabled={disable}
            onClick={submit}
            type="submit"
          >
            Verification Link
          </Button>
          {show ? (
            <>
              <Divider style={{ margin: "10px 0" }} />
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: "0.7",
                }}
              >
                Resend Link in 00:{counter}
              </Typography>
            </>
          ) : null}
        </form>
      </Paper>
    </Grid>
  );
}

export default Recovery;
