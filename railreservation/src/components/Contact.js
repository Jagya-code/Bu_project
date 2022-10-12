import React, { useState } from "react";


const FORM_ENDPOINT = ""; // TODO - fill on the later step

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <div className="full">
      <form
        id="body"
        action={FORM_ENDPOINT}
        onSubmit={handleSubmit}
        method="POST"
        target="_blank"

      >
       <marquee> <p className="con" style={{color:"black",fontSize:"27px" }}><b>Contact Us at <i style={{color:"cadetblue"}}> rakhisengupta@gmail.com</i></b></p></marquee> 
        <br></br>
        <br></br>
        <br></br>
        <div className="mb-3 pt-0">
          <label className="lab1" style={{fontFamily:"serif", fontWeight:"bolder", fontSize:"25px" }}>Enter your name: </label>
          <input
            id="ip1"
            type="text"
            placeholder="Your name"
            name="name"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <div className="mb-3 pt-0">
          <label className="lab2" style={{fontFamily:"serif", fontWeight:"bolder", fontSize:"25px" }}>Enter your email: </label>
          <input
            id="ip2"
            type="email"
            placeholder="Email"
            name="email"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <div className="mb-3 pt-0">
          <label className="lab3" style={{fontFamily:"serif", fontWeight:"bolder", fontSize:"25px" }}>Enter message/feedback: </label>
          <textarea
            placeholder="Your message"
            id="ip3"
            name="message"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
          />
        </div>
        <div className="mb-3 pt-0">
          <button
            id="btnc"
            className=" font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            style={{fontFamily:"san-serif", fontWeight:"bolder", fontSize:"20px" }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;