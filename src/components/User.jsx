import React, { useState } from "react";
import Male from "../assets/male.svg";
import Female from "../assets/female.svg";

function User(props) {
  const { name, setName, gender, setGender } = props;

  return (
    <div>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => {
            setGender("Male");
          }}
          className="border-0 bg-transparent rounded-circle p-0"
        >
          <img
            className={`w-50 gender ${
              gender === "Male" ? "active bg-success" : ""
            }`}
            src={Male}
            alt="maleimg"
          />
          <p>Male</p>
        </button>
        <button
          onClick={() => {
            setGender("Female");
          }}
          className="border-0 bg-transparent rounded-circle p-0"
        >
          <img
            className={`w-50 gender ${
              gender === "Female" ? "active bg-success" : ""
            }`}
            src={Female}
            alt="femaleimg"
          />
          <p>Female</p>
        </button>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-person"></i>
        </span>
        <input
          type="text"
          className="form-control p-2"
          placeholder="Your Name"
          aria-label="yourname"
          aria-describedby="basic-addon1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default User;
