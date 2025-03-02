import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import WeightandAge from "./WeightandAge";
import User from "./User";
import Loading from "./Loading";

function BMIResult() {
  const [isLoading, setIsLoading] = useState(false);
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(20);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const storedHistory =
        JSON.parse(localStorage.getItem("bmiHistory")) || [];
      setHistory(storedHistory);
      setIsLoading(false);
    }, 1500);
  }, []);

  const calculateBMI = () => {
    if (!name.trim() || !gender.trim()) {
      alert("Please enter your name and your gender");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      console.log("ini adalah bmi value: ", bmiValue);

      let bmiCategory = "";
      if (gender === "Male") {
        if (bmiValue < 18.5) {
          bmiCategory = "Underweight";
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
          bmiCategory = "Normal weight";
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
          bmiCategory = "Overweight";
        } else {
          bmiCategory = "Obese";
        }
      } else if (gender === "Female") {
        if (bmiValue < 19.5) {
          bmiCategory = "Underweight";
        } else if (bmiValue >= 19.5 && bmiValue < 25.9) {
          bmiCategory = "Normal weight";
        } else if (bmiValue >= 26 && bmiValue < 30.9) {
          bmiCategory = "Overweight";
        } else {
          bmiCategory = "Obese";
        }
      }

      setBmi(bmiValue);
      setCategory(bmiCategory);

      const newEntry = {
        name,
        gender,
        height,
        weight,
        bmi: bmiValue,
        category: bmiCategory,
      };
      console.log("ini adalah new entry", newEntry);

      const updatedHistory = [newEntry, ...history.slice(0, 4)];
      setHistory(updatedHistory);
      localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bmi-container border border-1 rounded shadow-sm p-3 mx-auto">
      <div className="d-flex w-auto flex-column justify-content-center my-3">
        <h1 className="fw-bold text-center">BMI CALCULATOR</h1>
        <p className="fst-italic fw-light text-center">
          The BMI Calculator calculates the ideal body weight for individuals
          aged 18-65 years.
        </p>
      </div>

      <div className="container h-auto w-auto">
        <User
          name={name}
          setName={setName}
          gender={gender}
          setGender={setGender}
        />
        <Slider height={height} setHeight={setHeight} />
        <WeightandAge weight={weight} setWeight={setWeight} />
        <button
          className="fs-5 mt-3 btn btn-danger rounded-4 w-100 py-3 mt-2"
          onClick={calculateBMI}
        >
          Calculate
        </button>

        {/* Result BMI */}
        <div className="text-center shadow py-3 mt-3 rounded h-auto">
          <h2 className="fw-bold text-decoration-underline">BMI Result Here</h2>

          {isLoading ? (
            <Loading />
          ) : bmi && category ? (
            <>
              <h3>
                Your BMI: <span className="text-primary">{bmi}</span>
              </h3>
              <p>Category: {category}</p>
            </>
          ) : (
            <p className="fst-italic pt-2 px-5 bmi-msg">
              Enter your weight (must be at least 20 kg) and your age (cannot
              exceed 65 years), then press the Calculate button.
            </p>
          )}
        </div>

        {/* List History */}

        <div className="mt-4 mb-2 px-3 py-4 text-center rounded border-4 border-light shadow-lg h-auto">
          <h2 className="fw-bold mb-3 text-decoration-underline">
            Users History
          </h2>
          {isLoading ? (
            <Loading />
          ) : history.length > 0 ? (
            <ul className="list-group text-start rounded">
              {history.map((val, index) => (
                <li
                  key={index}
                  className="list-group-item py-3 px-4 rounded m-1 shadow-md"
                >
                  <h4 className="fw-bold">
                    {val.name} ({val.gender})
                  </h4>{" "}
                  {val.bmi} - {val.category}
                </li>
              ))}
              <div className="d-flex justify-content-end mt-2">
                <button
                  onClick={() => {
                    if (confirm("You sure want to delete all BMI history ?")) {
                      localStorage.removeItem("bmiHistory");
                      setHistory([]);
                    }
                  }}
                  className="delete-history w-50 py-3 mt-2 bg-danger text-light rounded-4 border-1 border-light shadow-sm"
                >
                  <i className="bi bi-x-square"></i> Delete History
                </button>
              </div>
            </ul>
          ) : (
            <p className="fst-italic pt-2 px-5 bmi-msg">
              There is no history yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BMIResult;
