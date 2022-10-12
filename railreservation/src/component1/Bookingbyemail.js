import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import getBookingByemail from "../services/user.service";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import userservice from "../services/user.service";
import bookingservice from "../services/booking.service";
import Modal from "react-bootstrap/Modal";

const Bookingbyemail = () => {
  const [booking, setBooking] = useState([]);

  const [emailId, setEmailId] = useState(" ");

  const init = (emailId) => {
    getBookingByemail
      .getBookingByemail(emailId)
      .then((response) => {
        if(response.data=="")
        {
          window.alert("EmailId doesnt exist!");
        }
        console.log("Printing all booking ", response.data);
        setBooking(response.data);
      })
      // .catch((error) => {
      //   console.log("Something went wrong", error);
      //   window.alert("EmailId doesnt exist!");
      // });
  };

  const handleDelete = (id) => {
    console.log("Printing id", id);
    bookingservice
      .remove(id)
      .then((response) => {
        console.log("Booking has been Deleted", response.data);
        init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

  
  return (
    <div className="tam">
      <div class="form-group pt-2 pl-1">
        <label
          for="exampleInputName"
          style={{
            fontSize: "20px",
            color: "black",
            textAlign:"center",
            marginLeft: "10px",
            fontWeight: "bolder",
          }}
        >
          Enter your Email
        </label>
        <input
          type="text"
          placeholder="Enter Your Email"
          style={{width:"20rem"}}
          class="form-control"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
      </div>
      <Button
        onClick={() => init(emailId)}
        //variant=" #2c7f86;"
        type="submit"
        id="submit"
      >
        Find Booking
      </Button>
      <h3
        style={{
          color: "black",
          fontWeight: "bolder",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        List of Booking
      </h3>
      <hr />
      <div className="tlist">
        <table className="table table-bordered table-dark table-striped">
          <thead className="thead-light">
            <tr>
              <th> Train Name</th>
              <th> Train No</th>
              <th> FirstName</th>
              <th> LastName</th>
              <th> Age</th>
              <th> Start from</th>
              <th> Destination</th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={booking.id}>
                <td>{booking.train_name}</td>
                <td>{booking.train_no}</td>
                <td>{booking.fname}</td>
                <td>{booking.lname}</td>
                <td>{booking.age}</td>
                <td>{booking.start_from}</td>
                <td>{booking.destination}</td>
                <td>
                  {" "}
                  <button className="btn btn-danger ml-2" onClick={handleShow}>
                    Delete
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Want to Delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>If yes , Click on Delete</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDelete(booking.id);
                        }}
                      >
                        <Link
                          to="/profile"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Cancel Booking
                        </Link>
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <Link to="/profile">
        <button className="bckc">Back </button>
      </Link>
    </div>
  );
};

export default Bookingbyemail;
