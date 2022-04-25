import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/DataTable/Datatable";
import "./list.scss";
const axios = require("axios");
const List = () => {
  const [data, setData] = useState([]);
  const getDta = () => {
    axios
      .get("http://localhost:8080/api/v3/admin/web/totalJoun")
      .then((res) => {
        console.log(
          res.data.data.map((e) => {
            return e;
          })
        );
        const result = res.data.data;
        setData(result);
      });
  };
  useEffect(() => getDta(), []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable data={data} />
      </div>
    </div>
  );
};

export default List;
