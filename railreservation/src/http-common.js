import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8031",
  headers: {
    "Content-Type": "application/json",
  },
});