import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8041",
  headers: {
    "Content-Type": "application/json",
  },
});