import React, { useState } from "react";

function WeightandAge(props) {
  const { weight, setWeight } = props;
  const [age, setAge] = useState(18);

  const handleIncrement = (state, setState, value, message) => {
    if (state < value) {
      setState(state + 1);
    } else {
      alert(message);
    }
  };

  const handleDecrement = (state, setState, value, message) => {
    if (state > value) {
      setState(state - 1);
    } else {
      alert(message);
    }
  };

  const handleChange = (e, setState) => {
    let value = e.target.value;
    if (value === "") {
      setState("");
      return;
    }

    let numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setState(numericValue);
    }
  };

  const handleBlur = (
    state,
    setState,
    lessValue,
    moreValue,
    lessMsg,
    moreMsg
  ) => {
    if (state === "" || state < lessValue) {
      setState(lessValue);
      alert(lessMsg);
    } else if (state > moreValue) {
      setState(moreValue);
      alert(moreMsg);
    }
  };

  const handleKeyDown = (
    e,
    state,
    setState,
    lessValue,
    moreValue,
    lessMsg,
    moreMsg
  ) => {
    if (e.key == "Enter") {
      if (state === "" || state < lessValue) {
        setState(lessValue);
        alert(lessMsg);
      } else if (state > moreValue) {
        setState(moreValue);
        alert(moreMsg);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center gap-2 mt-2">
      {/* Weight */}
      <div className="text-center w-50 shadow py-5">
        <p>Weight</p>
        <h1>
          {
            <input
              type="number"
              className="fw-bold fs-1 text-center border-0 rounded-pill form-control shadow-none no-spinner"
              min="20"
              max="200"
              value={weight}
              onChange={(e) => handleChange(e, setWeight)}
              onBlur={() =>
                handleBlur(
                  weight,
                  setWeight,
                  20,
                  200,
                  "Cant less than 20",
                  "cant more than 200"
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  weight,
                  setWeight,
                  20,
                  200,
                  "Cant less than 20",
                  "cant more than 200"
                )
              }
            />
          }
        </h1>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() =>
              handleDecrement(weight, setWeight, 20, "Cant less than 20")
            }
            className="btn btn-outline-danger fs-3 rounded-circle"
          >
            <i className="bi bi-dash"></i>
          </button>
          <button
            onClick={() =>
              handleIncrement(
                weight,
                setWeight,
                200,
                "If your weight more than 200, you must be a truck"
              )
            }
            className="btn btn-outline-primary fs-3 rounded-circle"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>

      {/* Age */}
      <div className="text-center w-50 shadow py-5">
        <p>Age</p>
        <h1>
          {
            <input
              type="number"
              className="fw-bold fs-1 text-center border-0 rounded-pill form-control shadow-none"
              min="18"
              max="65"
              value={age}
              onChange={(e) => handleChange(e, setAge)}
              onBlur={() =>
                handleBlur(
                  age,
                  setAge,
                  18,
                  65,
                  "Cant less than 18 y.o",
                  "cant more than 65 y.o"
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  age,
                  setAge,
                  18,
                  65,
                  "Cant less than 18 y.o",
                  "cant more than 65 y.o"
                )
              }
            />
          }
        </h1>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() =>
              handleDecrement(age, setAge, 18, "Cant less than 18 y.o")
            }
            className="btn btn-outline-danger fs-3 rounded-circle"
          >
            <i className="bi bi-dash"></i>
          </button>
          <button
            onClick={() =>
              handleIncrement(age, setAge, 65, "Cant more than 65 y.o")
            }
            className="btn btn-outline-primary fs-3 rounded-circle"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeightandAge;
