import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/DataTable/Datatable";
import "./AcceptedList.scss";

const axios = require("axios");

const AcceptedList = () => {
  const [data, setData] = useState([]);
  const getAcceptDta = () => {
    axios.get("http://localhost:8080/api/v3/admin/acceptedjoun").then((res) => {
      const result = res.data.data;
      setData(result);
    });
  };
  useEffect(() => getAcceptDta(), []);

  return (
    <div className="AcceptedList">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="AcceptedList_title">
          <h2>Accepted List</h2>
        </div>
        <Datatable data={data} />
      </div>
    </div>
  );
};

export default AcceptedList;
