import React, { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
toast.configure();

function SignUp() {
  const paperStyle = { padding: "30px 20px", width: "380px" };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    resume: File,
  });

  // const postDetails = async (e) => {
  //   e.preventDefault();
  //   const datafile = new FormData();
  //   datafile.append("file", userData.resume);
  //   datafile.append("upload_preset", "upload-resume");
  //   datafile.append("cloud_name", "dhfdthciu");
  //   console.log(datafile);
  //   await axios({
  //     method: "POST",
  //     url: "https://api.cloudinary.com/v1_1/dhfdthciu/image/upload",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: datafile,
  //   })
  //     .then((res) => {
  //       console.log(res + "response");
  //       console.log("hello");
  //     })
  //     .then((data) => {
  //       console.log("hello1");
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log("Internal Server Error" + err);
  //     });
  // };

  const pdfUpload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    formdata.append("upload_preset", "upload-resume");
    console.log("formatdata", formdata);
    await axios
      .post("https://api.cloudinary.com/v1_1/dhfdthciu/image/upload", formdata)
      .then((res) => {
        let filename = res.data.original_filename + "." + res.data.format;
        console.log(filename);
        setUserData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          resume: res.data.secure_url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = async (e) => {
    e.preventDefault();
    if (userData.firstName.length < 3 || userData.firstName.length > 20) {
      return toast.warning("First Name Must Be Grater Than 4 Char.");
    }

    if (userData.lastName.length < 3 || userData.lastName.length > 20) {
      return toast.warning("Last Name Must Be Grater Than 4 Char.");
    }

    const emailRegEx =
      /[a-zA-Z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!emailRegEx.test(userData.email)) {
      return toast.warning("Invalid Email.");
    }

    const passRegEx = /^[A-Za-z]/;
    if (!passRegEx.test(userData.password)) {
      return toast.warning(
        "Password Must have Greater Than 8 Char. And have atleast one number, one uppercase and one lowercase letter"
      );
    }

    const body = JSON.stringify({
      name: userData.firstName + " " + userData.lastName,
      email: userData.email,
      password: userData.password,
      resume: userData.resume,
    });

    // User Register API
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v2/auth/journalist/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    })
      .then((res) => {
        console.log(res + "response");
        toast.success("User Register Successfully!");
        navigate("/pending");
      })
      .catch(() => {
        toast.error("Internal Server Error");
      });
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);
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
          <h2 style={{ marginTop: "10px" }}>Register</h2>
          <Typography variant="caption">Apply for Journalist</Typography>
        </Grid>
        <form style={{ marginTop: "10px" }}>
          <div style={{ display: "flex" }} className="flex">
            <TextField
              style={{ marginBottom: "10px", marginRight: "5px" }}
              fullWidth
              label="First Name"
              onChange={(e) => {
                setUserData({
                  firstName: e.target.value,
                  lastName: userData.lastName,
                  email: userData.email,
                  password: userData.password,
                  resume: userData.resume,
                });
              }}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              fullWidth
              label="Last Name"
              onChange={(e) => {
                setUserData({
                  firstName: userData.firstName,
                  lastName: e.target.value,
                  email: userData.email,
                  password: userData.password,
                  resume: userData.resume,
                });
              }}
            />
          </div>
          <TextField
            style={{ marginBottom: "10px" }}
            fullWidth
            label="Email"
            onChange={(e) => {
              setUserData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: e.target.value,
                password: userData.password,
                resume: userData.resume,
              });
            }}
          />
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <TextField
              style={{ marginBottom: "15px" }}
              fullWidth
              label="Password"
              type={show ? "text" : "password"}
              onChange={(e) => {
                setUserData({
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  email: userData.email,
                  password: e.target.value,
                  resume: userData.resume,
                });
              }}
            />
            <div
              style={{
                position: "absolute",
                marginLeft: "300px",
                zIndex: "100",
              }}
              className="visibility"
              onClick={() => setShow(!show)}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </Grid>
          <Input
            style={{ marginBottom: "10px" }}
            fullWidth
            type="file"
            label="Resume"
            onChange={(e) => pdfUpload(e)}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ background: "#139487", marginTop: "20px" }}
            onClick={submit}
          >
            Sign Up
          </Button>
          <Divider style={{ margin: "10px 0" }} />

          <Typography>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span style={{ color: "#139487", cursor: "pointer" }}>
                Sign In
              </span>
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
}

export default SignUp;
