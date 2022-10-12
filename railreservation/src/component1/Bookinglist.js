import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import bookingservice from "../services/booking.service";
const Bookinglist = () => {
  const [booking, setBooking] = useState([]);

  const init = () => {
    bookingservice
      .getAll()
      .then((response) => {
        console.log("Printing all booking ", response.data);
        setBooking(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);
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
        List of Booking
      </h3>
      <hr />
      <div className="tlist" style={{width:"80rem", marginLeft:"8rem"}}>
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
              {/* <th> Actions </th> */}
            </tr>
          </thead>
          <tbody>
            {booking.map((bookings) => (
              <tr key={bookings.id}>
                <td>{bookings.train_name}</td>
                <td>{bookings.train_no}</td>
                <td>{bookings.fname}</td>
                <td>{bookings.lname}</td>
                <td>{bookings.age}</td>
                <td>{bookings.start_from}</td>
                <td>{bookings.destination}</td>
                {/* <td>
                  {" "}
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      handleDelete(bookings.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-warning"
                    to={`/booking/edit/${bookings.id}`}
                  >
                    Update
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <>

      <Link to="/adminprofile">
          <button className="bckc">Back </button>
        </Link>
      </>
    </div>
  );
};

export default Bookinglist;
