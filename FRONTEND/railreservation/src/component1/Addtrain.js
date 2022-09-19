import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import userservice from "../services/user.service";
import trainservice from "../services/train.service";
import AuthService from "../services/auth-service";
// import "bootstrap/dist/css/bootstrap.min.css";
let p = localStorage.getItem("username");
const Addtrain = () => {

  const [train_no, setTrainNo] = useState([]);
  const [train_name, setTrainName] = useState("");
  const [start_from, setStartFrom] = useState("");
  const [departure_time, setDepartureTime] = useState("");
  const [to_destination, setToDestination] = useState("");
  const [arrival_time, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

 

  const saveTrain = (e) => {
    e.preventDefault();

    const train = {
      train_no,
      train_name,
      start_from,
      departure_time,
      to_destination,
      arrival_time,
      price,
      id
    
    };

    if (id) {
      //update
      trainservice
        .update(train)
        .then((response) => {
          console.log("Train details updated successfully", response.data);

          navigate("/trainlist1");
        })

        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      // create
      userservice
        .createTrainDetails(train)
        .then((response) => {
          console.log("Train details added successfully", response.data);
          navigate("/trainlist1");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      trainservice
        .get(id)
        .then((train) => {
          setTrainNo(train.data.train_no);
          setTrainName(train.data.train_name);
          setStartFrom(train.data.start_from);
          setDepartureTime(train.data.departure_time);
          setToDestination(train.data.to_destination);
          setArrivalTime(train.data.arrival_time);
          setPrice(train.data.price);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);
  function SubmitBtn() {
    if (
      train_no &&
      train_name &&
      start_from &&
      departure_time &&
      to_destination &&
      arrival_time &&
      price
    )
      return (
        <button onClick={(o) => saveTrain(o)} className="btn btn-success">
          Save
        </button>
      );
    else
      return (
        <button className="btn btn-success" disabled>
          Save
        </button>
      );
  }
  return (
    <div className="container">
      <h3 style={{ color: "black", fontWeight: "bolder", fontSize: "40px" , textAlign:"center"}}>
        Add and Update Train Details
      </h3>
      <hr />
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4 is-invalid"
            id="train_no"
            value={train_no}
            onChange={(e) => setTrainNo(e.target.value)}
            placeholder="Enter Train No"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4 is-invalid"
            id="train_name"
            value={train_name}
            onChange={(e) => setTrainName(e.target.value)}
            placeholder="Enter Train Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4 is-invalid"
            id="start_from"
            value={start_from}
            onChange={(e) => setStartFrom(e.target.value)}
            placeholder="Enter Start from"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4 is-invalid"
            id="departure_time"
            value={departure_time}
            onChange={(e) => setDepartureTime(e.target.value)}
            placeholder="Enter Departure Time"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4 is-invalid"
            id="to_destination"
            value={to_destination}
            onChange={(e) => setToDestination(e.target.value)}
            placeholder="Enter To Destination"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control col-4 is-invalid"
            id="arrival_time"
            value={arrival_time}
            onChange={(e) => setArrivalTime(e.target.value)}
            placeholder="Enter Arrival Time"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control col-4 is-invalid"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            required
          />
        </div>

        <div>
          {/* <button onClick={(e) => saveOrd(e)} className="btn btn-primary">
            Save
          </button> */}
          <SubmitBtn />
        </div>
      </form>
      <hr />
      <Link to="/adminprofile">
          <button className="bckc">Back </button>
        </Link>
    </div>
  );
};

export default Addtrain;