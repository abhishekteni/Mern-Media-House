import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Widgets from "../../components/widgets/Widgets";
import Featured from "../../components/featured/Featured";
import List from "../../components/List/List";
import { searchFunc, searchresult } from "../Apicall";
import "./home.scss";
import { AreaChart, Area } from "recharts";
import Chart from "../../components/chart/Chart";
import { useSelector } from "react-redux";
const Home = () => {
  const totalblogfount = useSelector((state) => state.blogcount.blog);
  const [blogdata, setBlogdata] = useState([]);
  const searchparams = () => {
    if (searchresult.length > 0) {
      setBlogdata(searchresult[0]);
    } else {
      setBlogdata(blogdata);
    }
  };
  const getrecentblogs = () => {
    axios.get("http://localhost:8080/api/v1/blog/6latestBlogs").then((res) => {
      const result = res.data.data;

      setBlogdata(result);
    });
  };
  useEffect(() => {
    getrecentblogs();
    searchparams();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="blogs" />
          <Widgets type="Journalists" />
          {/* <Widgets type="categories" />
          <Widgets type="categories" /> */}
        </div>
        <div className="charts">
          <Chart
            aspect={2 / 1}
            title="Total Blogs in last six months"
            type={AreaChart}
            typename={Area}
          />
          <Featured count={totalblogfount} title="blog" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent Blogs</div>
          <List data={blogdata} />
        </div>
      </div>
    </div>
  );
};

export default Home;
