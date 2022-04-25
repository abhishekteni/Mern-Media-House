import React from "react";
import "./widgets.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import ClassIcon from "@mui/icons-material/Class";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useSelector } from "react-redux";
const Widgets = ({ type }) => {
  let data;

  const totalblogfount = useSelector((state) => state.blogcount.blog);
  const totaluserscount = useSelector((state) => state.usercount.blog);
  const totaljouncount = useSelector((state) => state.jouncount.blog);
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        count: totaluserscount,
        link: "see all users",
        icon: (
          <AccountCircleOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "blogs":
      data = {
        title: "blogs",
        count: totalblogfount,
        link: "see all blogs",
        icon: (
          <BackupTableIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "Journalists":
      data = {
        title: "Journalists",
        count: totaljouncount,
        link: "see all Journalists",
        icon: (
          <ClassIcon
            className="icon"
            style={{ color: "orange", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ExpandLessIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
