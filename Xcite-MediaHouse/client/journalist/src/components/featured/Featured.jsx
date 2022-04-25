import React from "react";
import "./features.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Featured = ({ count, title }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total {title}</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={count} text={count} strokeWidth={4} />
        </div>
        <p className="title">
          Total {count} {title} have been created this far{" "}
        </p>
        <p className="desc">
          {" "}
          According to the statistics illustrated by the application, a total of{" "}
          {count} {title} were created. After six months, this target is set to
          cross the {count * 2}th mark.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <ExpandLessIcon fontSize="false" />
              <div className="resultAmount">{count * 2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
