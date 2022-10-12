import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth-service";
import Form from "react-bootstrap/Form";
import logo1 from "../assets/logo1.jpg";


let b = localStorage.getItem("username");
let s = false;
if (b != undefined) {
  s = true;
}
const Header = () => {

 
  const [train, setTrain] = useState([]);
  const [train_name, setTrainName] = useState([]);

  const search = (e) => {
    const val = {
      train_name,
    };

    localStorage.setItem("n", train_name);
    //  if(window.location.href!="/TrainDetails")
    window.location.href = "/TrainDetails";
  };
  

  return (
    <header className="header">
      <div>
        <img
          src={logo1}
          alt=""
          style={{
            height: "26px",
            width: "66px",
            paddingRight: "20px",
          }}
        />
      </div>

      <nav className="navbar" style={{ height: "40px" }}>
        <ul>
          <Link className="links" to="/">
            Home
          </Link>
          <Link className="links" to="/login">
            User Login
          </Link>
          <Link className="links" to="/Adminlogin">
            Admin Login
          </Link>
          <Link className="links" to="/signup">
            Register
          </Link>
          <Link className="links" to="/Contact">
            Contact Us
          </Link>
          <Link className="btn btn-warning"  style={{marginLeft:"14px", width:"88px", fontSize:"15px"}} to="/Train">
            Train
          </Link>
          { s
          ?<button
              // style={{ marginLeft: "88rem", marginTop:"10px" }}
              className="btn btn-danger "
              style={{marginLeft:"20px", width:"80px", fontSize:"13px"}}
              onClick={(e) => {
                window.location.href="/Logout"
              }}
            >
              LOGOUT
            </button>
            :<> </>
          }
        </ul>
      </nav>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          value={train_name}
          onChange={(e) => setTrainName(e.target.value)}
          className="me-2"
          aria-label="Search"
          style={{ marginLeft: "330px", height: "35px", width: "270px" }}
        />
        
        <button
          type="button"
          style={{ width: "78px", height: "32px", textAllign: "center" }}
          class="btn btn-warning homecontactbtn1"
          onClick={search}
        >
          Search
        </button>
      </Form>
    </header>
  );
};

export default Header;
