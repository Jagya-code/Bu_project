import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../services/auth-service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import bookingservice from "../services/booking.service";
const Addbooking = () => {
  const [train_no, setTrainNo] = useState("");
  const [train_name, setTrainName] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [emailId, setEmailId] = useState("");
  const [start_from, setStartFrom] = useState("");
  const [coach_no, setCoachNo] = useState("");
  const [seat_no, setSeatNo] = useState("");
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const saveBooking = (e) => {
    e.preventDefault();

    const booking = {
      id,
      train_name, 
      train_no,
      
      fname,
      lname,
      age,
      start_from,
      destination,
      emailId,
      coach_no,
      seat_no
      
    };

    if (id) {
      //update
      bookingservice
        .update(booking)
        .then((response) => {
          console.log("booking data updated successfully", response.data);
          localStorage.setItem("email", booking.emailId);
          localStorage.setItem("train_name", booking.train_name);
          localStorage.setItem("train_no", booking.train_no);
          localStorage.setItem("fname", booking.fname);
          localStorage.setItem("lname", booking.lname);
          localStorage.setItem("age", booking.age);
          localStorage.setItem("bookingId", booking.id);
          localStorage.setItem("start_from", booking.start_from);
          localStorage.setItem("destination", booking.destination);
          window.location.href = "/fullticket";
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      // create
      bookingservice
        .create(booking)
        .then((response) => {
          console.log("booking added successfully", response.data);
          localStorage.setItem("email", booking.emailId);
          localStorage.setItem("train_name", booking.train_name);
          localStorage.setItem("train_no", booking.train_no);
          localStorage.setItem("fname", booking.fname);
          localStorage.setItem("lname", booking.lname);
          localStorage.setItem("age", booking.age);
          localStorage.setItem("bookingId", booking.id);
          localStorage.setItem("start_from", booking.start_from);
          localStorage.setItem("destination", booking.destination);
          localStorage.setItem("coach_no", booking.coach_no);
          localStorage.setItem("seat_no", booking.seat_no);
          window.location.href = "/fullticket";

          // localStorage.setItem("email", booking.emailId);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      bookingservice
        .get(id)
        .then((bookings) => {
          setTrainNo(bookings.data.train_no);
          setTrainName(bookings.data.train_name);
          setFname(bookings.data.fname);
          setLname(bookings.data.lname);
          setAge(bookings.data.age);
          setStartFrom(bookings.data.start_from);
          setDestination(bookings.data.destination);
          setEmailId(bookings.data.emailId);
          setSeatNo(bookings.data.seat_no);
          setCoachNo(bookings.data.coach_no);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);
  return (
    <>
      <section>
      
        <div class="container d-flex justify-content-center" >
        <form className="form-control"style={{
              width: "55rem",
              height: "31rem",
              marginTop:"30px",
              marginRight: "15rem",
              backgroundColor: "powderblue",
              boxShadow: "1px 2px 9px #F4AAB9",
            }} >
              <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter TrainName
              </label>
              <input
                type="text"
                placeholder="TrainName"
                class="form-control"
                value={train_name}
                onChange={(e) => setTrainName(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your First Name
              </label>
              <input
                type="text"
                placeholder="FirstName"
                class="form-control"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your Last Name
              </label>
              <input
                type="text"
                placeholder="LastName"
                class="form-control"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your Age
              </label>
              <input
                type="number"
                placeholder="Age"
                class="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter your EmailId
              </label>
              <input
                type="email"
                placeholder="emailId"
                class="form-control"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter prefered Coach no: 
              </label>
              <input
                type="text"
                placeholder="coach_no"
                class="form-control"
                value={coach_no}
                onChange={(e) => setCoachNo(e.target.value)}
              />
            </div>

            <div class="form-group pt-2 pl-1">
              <label
                for="exampleInputName"
                style={{
                  fontSize: "15px",
                  color: "black",
                  marginLeft: "10px",
                  fontWeight: "bolder",
                }}
              >
                Enter prefered Seat no: 
              </label>
              <input
                type="text"
                placeholder="seat_no"
                class="form-control"
                value={seat_no}
                onChange={(e) => setSeatNo(e.target.value)}
              />
            </div>


            <Button
              style={{ width: "150px", height: "45px" }}
              onClick={(o) => saveBooking(o)}
              //variant=" #2c7f86;"
              type="submit"
              id="submit"
            >
              Confirm Booking
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Addbooking;