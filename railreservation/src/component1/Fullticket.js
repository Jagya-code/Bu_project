import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import bookingservice from "../services/booking.service";
import AuthService from "../services/auth-service";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

 let e = localStorage.getItem("email");
 

const Fullticket = () => {
 

 const [booking, setBooking] = useState([]);

 useEffect(() => {
   if (e) {
     bookingservice
       .getbookingEmail(e)
       .then((response) => {
         console.log("Printing all booking ", response.data);
                setBooking(response.data);
                // localStorage.setItem("id1",booking.id);
                 console.log("id1",booking.id);
                
       })

        
       
       .catch((error) => {
         console.log("Something went wrong", error);
       });
   }
 }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (i) => {
     i=booking.id;
    console.log("Printing id", i);
    bookingservice
      .remove(i)
      .then((response) => {
        console.log("Booking has been Deleted", response.data);
        //  init();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  return (
    <div className="showcase">
      <div className="item3">
      
        <div className="">
       
          <table className="table table-bordered table-dark table-striped">
            <thead className="">
              <tr>
                <th> Train Name</th>
                <th> Train No</th>
                <th> FirstName</th>
                <th> LastName</th>
                <th> Age</th>
                <th> Start from</th>
                <th> Destination</th>
                <th> emailId</th>
                <th> seat no</th>
                <th> coach no</th>

                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              <tr key={booking.id}>
                <td>{booking.train_name}</td>
                <td>{booking.train_no}</td>
                <td>{booking.fname}</td>
                <td>{booking.lname}</td>
                <td>{booking.age}</td>
                <td>{booking.start_from}</td>
                <td>{booking.destination}</td>
                <td>{booking.emailId}</td>
                <td>{booking.seat_no}</td>
                <td>{booking.coach_no}</td>
                <td>
                  <button className="btn btn-danger ml-2" onClick={handleShow}>
                    Delete
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Want to Delete Booking?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>If yes , Click on Delete</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
          
                        onClick={(o) => handleDelete(o)}
                      >
                        <Link
                          to="/profile"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Delete
                        </Link>
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* <Link
                    className="btn btn-warning"
                    to={`/booking/edit/${booking.id}`}
                  >
                    Update
                  </Link> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <Link className="btn btn-warning" to={`/payment`}>
          Payment
        </Link> */}
      </div>
      <Link className="btn btn-warning" to="/profile">
        Back
      </Link>
    </div>

    // </div>
  );
};

export default Fullticket;