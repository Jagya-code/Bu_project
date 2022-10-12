import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getByTrainName from "../services/train.service";

let p = localStorage.getItem("n");
console.log(p);

const TrainDetails = () => {

  const [search, setSearch] = useState([]);
  // const[record,setRecord]=useState([]);
  const [train, setTrain] = useState("");

 
  // Search Item by Name
 
  
    getByTrainName
    .getByTrainName(p)
    .then((response) => {
      setSearch(response.data);
    });
    
  

  return (
    <div className="tam">
      <h3
        style={{
          color: "black",
          fontWeight: "bolder",
          fontSize: "40px",
          textAlign: "center",
        }}
      >
        List of Trains
      </h3>

      <div className="tlist" >
       
        <table className="table table-bordered table-dark table-striped">
          <thead className="thead-light">
            <tr>
              <th> Train Name</th>
              <th> Start From</th>
              <th> Departure Time</th>
              <th> To Destination</th>
              <th> Arrival Time</th>
              <th> Ticket Price</th>
            </tr>
          </thead>
          <tbody>
          {
            <tr >
              <td>{search.train_name}</td>
              <td>{search.start_from}</td>
              <td>{search.departure_time}</td>
              <td>{search.to_destination}</td>
              <td>{search.arrival_time}</td>
              <td>{search.price}</td>
            </tr>
          }
          </tbody>
        </table>
      </div>
      <Link to="/">
          <button className="bckc">Back </button>
        </Link>
    </div>
  );

};

export default TrainDetails;
