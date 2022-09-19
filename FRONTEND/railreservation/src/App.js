import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Showcase from "./components/Showcase";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Userlogin from "./components/Userlogin";
import SignUp from "./components/SignUp";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Trainlist from "./component1/Trainlist";
import Userlist from "./component1/UserList";
import Bookinglist from "./component1/Bookinglist";
import Addbooking from "./component1/Addbooking";
import Profile from "./components/Profile";

import TrainDetails from "./component1/TrainDetails";
// import Addticket from "./component1/Addticket";
import Trainlist1 from "./component1/Trainlist1";
import Addtrain from "./component1/Addtrain";
import Fullticket from "./component1/Fullticket";
import Adminprofile from "./components/Adminprofile";
import Adminlogin from "./components/Adminlogin";
import Bookingbyemail from "./component1/Bookingbyemail";
import SignUp1 from "./components/SignUp1";
import { Logout } from "./components/Logout";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Land-Page Home, About */}
        <Route path="/" element={<Showcase />} />
        <Route path="/d" element={<Destinations />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/Train" element={<Trainlist />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/User" element={<Userlist />} />
        <Route path="/Booking" element={<Bookinglist />} />
        <Route path="/Addbooking" element={<Addbooking />} />
        <Route path="/fullticket" element={<Fullticket />} />
        <Route path="/booking/edit/:id" element={<Addbooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/TrainDetails" element={<TrainDetails />} />
        <Route path="/Addtrain" element={<Addtrain />} />
        <Route path="/adminprofile" element={<Adminprofile />} />
        <Route path="/trainlist1" element={<Trainlist1 />} />
        <Route path="/trainlist/edit/:id" element={<Addtrain />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/bookingbyemail" element={<Bookingbyemail />} />
        <Route path="/user/edit/:id" element={<SignUp1/>} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
