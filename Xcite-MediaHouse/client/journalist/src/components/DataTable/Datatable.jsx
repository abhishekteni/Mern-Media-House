import React from "react";
import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../pages/Datatablesource";
import { Link } from "react-router-dom";
import { Accept } from "../../pages/Apicall";
import { useSelector } from "react-redux";
const axios = require("axios");

const Datatable = ({ data }) => {
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
            {jounIds === params.row._id || userInfo.admin === true ? (
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
        getRowId={(row) => row._id}
        columns={
          authUser
            ? userInfo.admin === true
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
