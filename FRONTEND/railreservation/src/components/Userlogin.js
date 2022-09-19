import React, { useState, useEffect } from "react";
import auth from "../services/auth-service";
import { Link, useNavigate, useParams } from "react-router-dom";
 const Userlogin = () => {
   const [username, setUserName] = useState("");
   const [password, setPass] = useState("");
   const navigate = useNavigate();
   const Regi = (e) => {
     e.preventDefault();

     const val = {
       username,
       password,
     };

     auth
       .auth(val)
       .then((response) => {
         console.log("Feedback added successfully", response.data);
         localStorage.setItem("jwt", response.data.jwt);
         localStorage.setItem("username", val.username);

         window.location.href = "/profile";
       })
       .catch((error) => {
         console.log("Something went wrong", error);
       });
   };

   return (
     <div>
       <div style={{textAlign:"center"}}> <h1> User Login</h1></div> 
       <div class="container d-flex justify-content-center" >
         <form
           className="form-control"
           style={{
            width: "33rem",
            height: "12rem",
            marginTop: "9rem",
            marginRight: "15rem",
            boxShadow: '1px 2px 9px #F4AAB9',
            backgroundColor: "tan"
          }}
         >
           <div class="form-group pt-2 pl-1">
             <label
               for="exampleInputName"
               style={{ fontSize: "20px",fontWeight:"bolder",color: "black" }}
             >
               {" "}
               Enter your UserName
             </label>
             <input
               type="text"
               class="form-control"
               id="exampleInputName"
               value={username}
               onChange={(e) => setUserName(e.target.value)}
             />
           </div>

           <div class="form-group pl-1">
             <label for="password" style={{ fontSize: "20px", fontWeight:"bolder",color: "black" }}>
               Enter your Password
             </label>
             <input
               type="password"
               class="form-control"
               id="exampleInputPassword"
               value={password}
               onChange={(e) => setPass(e.target.value)}
             />
           </div>
           <div>
             <div class="row homecontactbtn">
               <button
                 class="btn btn-primary homecontactbtn1"
                 onClick={(e) => {
                   Regi(e);
                 }}
                 style={{
                  marginTop: "3rem",
                  fontFamily: "serif",
                  paddingTop: "10px",
                  width: "10rem",
                  alignItems: "center",
                  marginLeft: "190px",
                  fontSize: "20px",
                 }}
               >
                 Login
               </button>
             </div>
           </div>
         </form>
       </div>
     </div>
   );
 };
 export default Userlogin;