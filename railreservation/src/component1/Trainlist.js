import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import trainservice from "../services/train.service";
let p = localStorage.getItem("jwt");
const Trainlist = () => {
  const [train, setTrains] = useState([]);
  const booking = (p) => {
    if (!p) {
      window.alert("please login before you want to book tickets!");
    } else {
      window.location.href = "/login";
    }
  };
  const init = () => {
    trainservice
      .getAll()
      .then((response) => {
        console.log("Printing train data", response.data);
        setTrains(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="tam">
      
      <h3
        style={{
          color: "black",
          fontWeight: "bolder",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        List of Trains
      </h3>
      <hr />
      <div>
        <table className="table table-bordered table-dark table-striped" style={{width:"89rem", marginLeft:"3rem"}}>
          <thead className="thead-dark">
            <tr>
              <th>train_no</th>
              <th> train_name</th>
              <th> start_from</th>
              <th> departure_time</th>
              <th> to_destination</th>
              <th> arrival_time</th>
              <th> price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {train.map((trains) => (
              <tr key={trains.id}>
                <td>{trains.train_no}</td>
                <td>{trains.train_name}</td>
                <td>{trains.start_from}</td>
                <td>{trains.departure_time}</td>
                <td>{trains.to_destination}</td>
                <td>{trains.arrival_time}</td>
                <td>{trains.price}</td>
                <td>
                  <button className="btn btn-success ml-2" onClick={()=>booking(p)}>
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <>

      <Link to="/">
          <button className="bckc">Back </button>
        </Link>
      </>
    </div>
  );
};

export default Trainlist;