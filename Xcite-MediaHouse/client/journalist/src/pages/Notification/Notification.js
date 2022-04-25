import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/DataTable/Datatable";
import List from "../../components/List/List";
import "./notification.scss";

const axios = require("axios");

const Notification = () => {
  const [data, setData] = useState([]);
  const getAcceptDta = () => {
    axios.get("http://localhost:8080/api/v3/admin/pendingjoun").then((res) => {
      console.log(
        res.data.data.map((e) => {
          return e;
        })
      );
      const result = res.data.data;
      setData(result);
    });
  };
  useEffect(() => getAcceptDta(), []);

  return (
    <div className="Notification">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="Notification_title">
          <h2>Pending List</h2>
        </div>
        <Datatable data={data} />
      </div>
    </div>
  );
};

export default Notification;
