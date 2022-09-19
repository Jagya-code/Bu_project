import React from "react";
import AuthService from "../services/auth-service";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import image2 from "../assets/image2.jpg";
let p = localStorage.getItem("username");
let j = localStorage.getItem("jwt");
const Adminprofile = () => {
  const navigate = useNavigate();
  const logOut = () => {
    AuthService.logout();
    navigate("/");
  };
  const [user, setFaculty] = useState([]);
  const init = () => {
    AuthService.getUser(p)
      .then((response) => {
        console.log("Printing faculty data", response.data);
        setFaculty(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <div class="grid-container1">
        <div class="item1">
          <h2
            style={{
              fontFamily: "Hanalei Fill'",
              textAlign: "center",
              color: "black",
              fontWeight:"bolder"
            }}
          >
           Welcome Admin!
          </h2>
          <h3
            style={{
              color: "green",
              textAlign: "center",
              paddingTop: "10px",
            }}
          >
            <strong>{user.username}</strong>
          </h3>
        </div>
        <div class="item2">
          {/* {" "}
          <p style={{ color: "black", textAlign: "center", fontSize: "small" }}>
            <strong>Email:</strong> {user.emailId}
          </p>
          <br></br>
          <p style={{ color: "black", textAlign: "center", fontSize: "small" }}>
            <strong>Age:</strong> {user.age}
          </p>
          <br></br>
          <p style={{ color: "black", textAlign: "center", fontSize: "small" }}>
            <strong>Gender:</strong> {user.gender}
          </p>
          <br></br>
          <p style={{ color: "black", textAlign: "center", fontSize: "small" }}>
            <strong>Contact No:</strong> {user.ph_no}
          </p> */}
          
          <Link
            className="btn btn-warning"
            to={`/Booking`}
            style={{ marginLeft: "",marginTop:"50px" }}
          >
            View Booking
          </Link>
          <Link
            className="btn btn-success"
            to={`/User`}
            style={{ marginLeft: "" ,marginTop:"50px"}}
          >
            View Users
          </Link>
          <Link
            className="btn btn-primary"
            to={`/AddTrain`}
            style={{ marginLeft: "",marginTop:"50px" }}
          >
            Add Trains
          </Link>
          <Link
            className="btn btn-secondary"
            to={`/trainlist1`}
            style={{ marginLeft: "" ,marginTop:"50px"}}
          >
            TrainList
          </Link>
        </div>
        <div class="item3">
          <table className="table table-bordered table-dark table-striped">
            <thead className="thead-light">
              <tr>
                <th> UserName</th>
                <th> EmailId</th>
                <th> Gender</th>
                <th> Age</th>
                <th> PhoneNo</th>
                <th> Roles</th>
              </tr>
            </thead>
            <tbody>
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.emailId}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.ph_no}</td>
                <td>{user.roles}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="item5">
          {" "}
          <footer id="footer">
            <ul class="navbar-nav">
              <li>
                Get connected with us on
                <img
                  src={image2}
                  alt="My Image"
                  style={{ height: "3rem", width: "27rem" }}
                />
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Adminprofile;