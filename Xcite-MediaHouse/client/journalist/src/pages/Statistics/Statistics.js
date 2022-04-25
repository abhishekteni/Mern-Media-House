import React from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widgets from "../../components/widgets/Widgets";
import { AreaChart, LineChart, BarChart, Line, Area, Bar } from "recharts";
import Featured from "../../components/featured/Featured";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Statistics.scss";
import Chart from "../../components/chart/Chart";
import {
  gettotalBlogCount,
  gettotalUserCount,
  gettotalJounCount,
} from "../../redux/action/blogAction";
const Statistics = () => {
  const token = useSelector((state) => state.userAuth.success);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const jounIds = userInfo.id;
  const dispatch = useDispatch();
  const totalblogfount = useSelector((state) => state.blogcount.blog);
  const totaluserscount = useSelector((state) => state.usercount.blog);
  const totaljouncount = useSelector((state) => state.jouncount.blog);

  const totalBlogCount = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v3/admin/web/totalBlog",
      data: {
        jounId: jounIds,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      dispatch(gettotalBlogCount(res.data.message));
    });
  };
  const totalJournalistCount = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v3/admin/web/totalJournalist",
      data: {
        jounId: jounIds,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      dispatch(gettotalJounCount(res.data.message));
    });
  };
  const totalUserCount = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v3/admin/web/totalUser",
      data: {
        jounId: jounIds,
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      dispatch(gettotalUserCount(res.data.message));
    });
  };
  useEffect(() => {
    totalBlogCount();
    totalJournalistCount();
    totalUserCount();
  }, []);
  return (
    <div className="Statistics">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="charts">
          <Featured count={totalblogfount} title="Blogs" />
          <Chart
            aspect={2 / 1}
            title="Total users in last six months"
            type={LineChart}
            typename={Line}
          />
        </div>
        <div className="charts">
          <Chart
            aspect={2 / 1}
            title="Total blogs in last six months"
            type={BarChart}
            typename={Bar}
          />
          <Featured count={totaljouncount} title="Journalists" />
        </div>
        <div className="charts">
          <Featured count={totaluserscount} title="users" />

          <Chart
            aspect={2 / 1}
            title="Total Users in last six months"
            type={AreaChart}
            typename={Area}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
