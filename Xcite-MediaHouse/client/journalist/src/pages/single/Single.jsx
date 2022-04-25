import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import List from "../../components/List/List";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import DownloadIcon from "@mui/icons-material/Download";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Divider } from "@mui/material";
import { Accept } from "../Apicall";
import { AreaChart, Area } from "recharts";
import { useParams } from "react-router-dom";
import "./single.scss";

const axios = require("axios");
const Single = () => {
  const [userdata, SetuserData] = useState([]);
  const [blogdata, setBlogdata] = useState([]);
  const id = useParams();
  const auth = useSelector((state) => state.userAuth.success);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = useSelector((state) => state.userAuth.success);
  const jounIds = userInfo.id;
  const getUserData = () => {
    axios
      .get(`http://localhost:8080/api/v2/joun/search/${id.userId}`)
      .then((res) => {
        console.log(res.data.data);
        const result = res.data.data;
        SetuserData(result);
      });
  };

  const getrecentblogs = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/joun/blog/${id.userId}`,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      const result = res.data.data;
      setBlogdata(result);
      console.log(result);
    });
  };
  useEffect(() => {
    getUserData();
    getrecentblogs();
  }, []);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              {id.userId == jounIds || userInfo.admin == true ? (
                <Link to={`./new`} style={{ textDecoration: "none" }}>
                  Edit
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="avatarImg">
                <img src={userdata.avatar} alt="" className="itemImg " />
              </div>
              <div className="details">
                <h1 className="itemTitle">{userdata.name}</h1>

                {/* <div className="social_media_icons">
                  <span className="icon">
                    <InstagramIcon style={{ fontSize: "20px" }} />
                  </span>
                  <span className="icon">
                    <FacebookIcon style={{ fontSize: "20px" }} />
                  </span>
                  <span className="icon">
                    <LinkedInIcon style={{ fontSize: "20px" }} />
                  </span>
                </div> */}
                <Divider />
                <div className="Userdetails">
                  <div className="total_blogs">
                    <span className="userblog_title">{blogdata.length}</span>
                    <span className="userblog_value">Written Blogs</span>
                  </div>
                  <div className="total_blogs">
                    <span className="userblog_title">21</span>
                    <span className="userblog_value">Saved Blogs</span>
                  </div>
                  <div className="total_blogs">
                    <span className="userblog_title">
                      {Math.floor(Math.random() * 90 + 10)}
                    </span>
                    <span className="userblog_value">Liked Blogs</span>
                  </div>
                </div>
                <Divider />
                <div className="detailItem">
                  <span className="itemvalue">{userdata.email}</span>
                </div>
                <div className="detailItem">
                  {userInfo.admin == true ? (
                    <div>
                      <Button
                        className="blogpermission"
                        variant="outlined"
                        color="success"
                        onClick={() => Accept(id.userId, token)}
                      >
                        Accept
                      </Button>
                      <Button
                        className="blogpermission"
                        variant="outlined"
                        color="error"
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* <div className="detailItem">
                  <span className="itemvalue">+91 0923809213</span>
                </div>
                <div className="detailItem">
                  <span className="itemvalue">
                    {" "}
                    2121, high-street,Delhi,India
                  </span>
                </div> */}
                {/* <div className="detailItem">
                  <span className="itemvalue">India</span>
                </div> */}
                <div className="detailItem">
                  <span className="itemkey">
                    <a
                      href={userdata.resume}
                      className="resume_download"
                      download={userdata.resume}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="download_resume">
                        {" "}
                        <DownloadIcon /> Download Resume
                      </button>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={2 / 1}
              title="Total Blogs in last six months"
              type={AreaChart}
              typename={Area}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Recently created Blogs by {userdata.name} </h1>
          <List data={blogdata} />
        </div>
      </div>
    </div>
  );
};

export default Single;
