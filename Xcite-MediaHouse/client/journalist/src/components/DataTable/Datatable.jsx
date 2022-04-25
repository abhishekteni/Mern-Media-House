import React, { useState } from "react";
import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../pages/Datatablesource";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Accept } from "../../pages/Apicall";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
const axios = require("axios");

const Datatable = ({ data }) => {
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  const token = useSelector((state) => state.userAuth.success);
  const authUser = useSelector((state) => state.userAuth.success);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const jounIds = userInfo.id;
  const viewColumn = [
    {
      field: "view",
      headerName: "View",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/journalists/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  const editColumn = [
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {jounIds == params.row._id || userInfo.admin == true ? (
              <Link
                to={`/journalists/${params.row._id}/new`}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">Edit</div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="acceptButton"
              onClick={() => Accept(params.row._id, token)}
            >
              Accept
            </div>
            <div
              className="deleteButton"
              //  onClick={() => handleDelete(params.row.id)}
            >
              Reject
            </div>

            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={
          authUser
            ? userInfo.admin == true
              ? userColumns.concat(viewColumn, actionColumn, editColumn)
              : userColumns.concat(viewColumn, editColumn)
            : userColumns.concat(viewColumn)
        }
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
