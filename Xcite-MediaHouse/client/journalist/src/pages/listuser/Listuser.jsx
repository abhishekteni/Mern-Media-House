import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

import "./listuser.scss";
const axios = require("axios");
const Listuser = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.userAuth.success);
  const getUserdata = async () => {
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/v3/admin/web/totalUserdata",
      data: {
        jounId: "6237a1eb3aae087853c61bd5",
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }).then((res) => {
      setData(res.data.message);
    });
  };

  useEffect(() => getUserdata(), []);
  return (
    <div className="userslist">
      <Sidebar />
      <div className="list_users_Container">
        <Navbar />
        <div className="tableContainer_users">
          <h1 className="listUsers_title">List of Users</h1>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="tableuserscell">id</TableCell>
                  <TableCell className="tableuserscell" align="right">
                    Profile
                  </TableCell>
                  <TableCell className="tableuserscell" align="left">
                    Name
                  </TableCell>
                  <TableCell className="tableuserscell" align="left">
                    email
                  </TableCell>
                  <TableCell className="tableuserscell" align="left">
                    likedBlogs
                  </TableCell>
                  <TableCell className="tableuserscell" align="left">
                    savedBlogs
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="tableuserscell"
                  >
                    <TableCell className="tableuserscell">{row._id}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <img
                        src={row.profilePicture}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginLeft: "30px",

                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                    <TableCell className="tableuserscell" align="left">
                      {row.name}
                    </TableCell>
                    <TableCell className="tableuserscell" align="left">
                      {row.email}
                    </TableCell>
                    <TableCell className="tableuserscell" align="left">
                      {row.likedBlogs.length}
                    </TableCell>
                    <TableCell className="tableuserscell" align="left">
                      {row.saveBlogs.length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Listuser;
