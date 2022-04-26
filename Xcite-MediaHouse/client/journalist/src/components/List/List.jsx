import React from "react";
import "./list.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ data }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {data.length > 0 ? (
          <TableHead>
            <TableRow>
              <TableCell className="tablecell">Blog _id</TableCell>
              <TableCell className="tablecell">title</TableCell>
              <TableCell className="tablecell">type</TableCell>
              <TableCell className="tablecell">createdAt</TableCell>
              <TableCell className="tablecell">tags</TableCell>
            </TableRow>
          </TableHead>
        ) : (
          <TableHead>
            <TableRow>
              <TableCell className="tablecell">No Data Found</TableCell>
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {data.slice(0, 10).map((recentblogdata) => (
            <TableRow key={recentblogdata._id}>
              <TableCell className="tablecell">{recentblogdata._id}</TableCell>
              <TableCell className="tablecell">
                <div className="cellWrapper">
                  <img src={recentblogdata.image} alt="" className="image" />
                  {recentblogdata.title.slice(0, 30)}..
                </div>
              </TableCell>
              <TableCell className="tablecell">{recentblogdata.type}</TableCell>
              <TableCell className="tablecell">
                {recentblogdata.createdAt.split("T")[0]}
              </TableCell>

              <TableCell className="tablecell">{recentblogdata.tags}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
