import { toast } from "react-toastify";

const axios = require("axios");
export const searchresult = [];
export const Accept = async (id, token) => {
  await axios({
    method: "POST",
    url: `http://localhost:8080/api/v3/admin/accept/${id}`,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((res) => {
    toast(res.data.message);
  });
};
export const Reject = async (id, token) => {
  await axios({
    method: "POST",
    url: `http://localhost:8080/api/v3/admin/reject/${id}`,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((res) => {
    toast(res.data.message);
  });
};
export const searchFunc = async (query) => {
  await axios({
    method: "GET",
    url: `http://localhost:8080/api/v1/blog/search/${query}`,
  }).then((res) => {
    const result = res.data.data;
    searchresult.push(result);
    
  });
};
