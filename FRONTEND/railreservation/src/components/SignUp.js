import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import userservice from "../services/user.service";
import Modal from "react-bootstrap/Modal";
const SignUp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setName] = useState("");
  const [emailId, setEmail] = useState("");

  const [password, setPass] = useState("");
  const [age, setAge] = useState("");

  const [gender, setGender] = useState("");
  const [ph_no, setPhone] = useState("");
  const [roles, setRoles] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveUser = (e) => {
    e.preventDefault();

    const user = { username, emailId, password, age, gender, ph_no, roles, id };

    if (id) {
      //update
      userservice
        .update(user)
        .then((response) => {
          console.log("user data updated successfully", response.data);
          navigate("/profile");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      // create
      userservice
        .create(user)
        .then((response) => {
          console.log("user added successfully", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      userservice
        .getUserId(id)
        .then((user) => {
          setName(user.data.username);
          setEmail(user.data.emailId);
          setPass(user.data.password);
          setAge(user.data.age);
          setGender(user.data.gender);
          setPhone(user.data.ph_no);
          setRoles(user.data.roles);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  return (
    <section>
      <div>
        <h2> Plese create an account!</h2>
        <div class="container d-flex justify-content-center">
          <form
            className="form-control"
            style={{
              width: "55rem",
              height: "35rem",
              marginTop: "1rem",
              marginRight: "15rem",
              backgroundColor: "powderblue",
              boxShadow: "1px 2px 9px #F4AAB9",
              paddingTop:"1px"
            }}
          >
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your UserName
              </label>
              <input
                type="text"
                placeholder="UserName"
                class="form-control"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your Password
              </label>
              <input
                type="password"
                placeholder="password"
                class="form-control"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your Email
              </label>
              <input
                type="text"
                placeholder="Enter Your Email"
                class="form-control"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your Gender
              </label>
              <input
                type="text"
                placeholder="Enter Your Age"
                class="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your Age
              </label>
              <input
                type="number"
                placeholder="Enter Your Age"
                class="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter Mobile No.
              </label>
              <input
                type="number"
                placeholder="Enter Your Mobile"
                class="form-control"
                value={ph_no}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter Role (Admin/User)
              </label>
              <input
                type="text"
                placeholder="Enter Your Role"
                class="form-control"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleShow}
              style={{
                marginTop: "1rem",
                fontFamily: "serif",
                paddingTop: "5px",
                width: "19rem",
                alignItems: "center",
                marginLeft: "250px",
                fontSize: "17px",
              }}
            >
              Create Account
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Do you want to register?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                If yes, Click on Save 
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={(o) => saveUser(o)}>
                  <Link to="/" style={{color:"white"}}>Save </Link>
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
