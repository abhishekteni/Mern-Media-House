import React from "react";
import {
  AreaChart,
  LineChart,
  BarChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";

const data = [
  { name: "January", Total: 21 },
  { name: "February", Total: 18 },
  { name: "march", Total: 20 },
  { name: "april", Total: 30 },
  { name: "may", Total: 12 },
  { name: "june", Total: 23 },
  { name: "july", Total: 34 },
];

const Chart = ({ aspect, title, type: Typer, typename: Typename }) => {
  return (
    <div className="chart">
      {" "}
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <Typer
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8878d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid
            strokeDasharray="3 3"
            className="chartgrid"
            stroke="gray"
          />
          <Tooltip />
          <Typename
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="#8884d8"
          />
        </Typer>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
