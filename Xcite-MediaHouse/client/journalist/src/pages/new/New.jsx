import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./new.scss";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import { toast } from "react-toastify";

const New = () => {
  const id = useParams();
  const token = useSelector((state) => state.userAuth.success);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const jounIds = userInfo.id;
  const [userdata, SetuserData] = useState([]);
  const [names, setName] = useState();
  const [emails, setEmail] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const avatarupdate = (url) => {
    fetch("http://localhost:8080/api/v2/joun/update/avatar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        jounId: userInfo.admin == true ? id.userId : jounIds,
        avatarLink: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("helloworld");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postProfile = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "profile-pic");
    data.append("cloud_name", "dhfdthciu");
    fetch("https://api.cloudinary.com/v1_1/dhfdthciu/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        avatarupdate(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    postProfile();
    try {
      let res = await fetch("http://localhost:8080/api/v2/joun/update/name", {
        method: "PUT",
        body: JSON.stringify({
          jounId: id.userId,
          name: names,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      let res_email = await fetch(
        "http://localhost:8080/api/v2/joun/update/name",
        {
          method: "PUT",
          body: JSON.stringify({
            jounId: id.userId,
            currentPassword: password,
            newEmail: emails,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      let resJson = await res.json();
      let resJso = await res_email.json();
      if (res.status === 200 || res_email.status === 200) {
        setName("");
        setEmail("");
        toast("User created successfully");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getUserData = () => {
    axios
      .get(`http://localhost:8080/api/v2/joun/search/${id.userId}`)
      .then((res) => {
        console.log(res.data.data);
        const result = res.data.data;
        SetuserData(result);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit user</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={userdata.avatar} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Upload Image:
                  <UploadFileIcon className="icon" style={{ color: "gray" }} />
                </label>

                <Input
                  type="file"
                  id="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <Input
                type="text"
                id="name"
                className="editInput"
                placeholder={userdata.name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                id="email"
                className="editInput"
                placeholder={userdata.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                id="password"
                className="editInput"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Submit</button>
              {/* <button onClick={postProfile}>Submit</button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
