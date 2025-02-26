import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import WeightandAge from "./WeightandAge";
import User from "./User";

function BMIResult() {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(20);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const calculateBMI = () => {
    if (!name.trim() || !gender.trim()) {
      alert("Please enter your name and your gender");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    console.log("ini adalah bmi value: ", bmiValue);

    let bmiCategory = "";
    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      bmiCategory = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    setBmi(bmiValue);
    setCategory(bmiCategory);

    // Simpan ke history dan localStorage
    const newEntry = { name, gender, height, weight, bmi: bmiValue, category: bmiCategory };
    console.log("ini adalah new entry", newEntry);

    const updatedHistory = [newEntry, ...history.slice(0, 4)];
    setHistory(updatedHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center my-3">
        <h1 className="fw-bold text-center">BMI CALCULATOR</h1>
        <p className="fst-italic fw-light text-center">The BMI Calculator calculates the ideal body weight for individuals aged 18-65 years.</p>
      </div>

      <div className="container h-auto">
        <User name={name} setName={setName} setGender={setGender} />
        <Slider height={height} setHeight={setHeight} />
        <WeightandAge weight={weight} setWeight={setWeight} />
        <button className="fs-5 mt-3 btn btn-danger rounded-4 w-100 py-3 mt-2" onClick={calculateBMI}>
          Calculate
        </button>

        {/* Result BMI */}
        <div className="text-center shadow py-3 mt-3 rounded h-auto">
          <h1 className="fw-bold text-decoration-underline">BMI Result Here</h1>

          {bmi && (
            <>
              <h2>
                Your BMI: <span className="text-primary">{bmi}</span>
              </h2>
              <p>Category: {category}</p>
            </>
          )}
        </div>

        {/* List History */}
        {history.length > 0 && (
          <div className="mt-4 mb-5 text-center">
            <h3 className="fw-bold p-3 mb-2 bg-success text-light rounded-pill">-- Users History --</h3>
            <ul className="list-group text-start rounded">
              {history.map((val, index) => (
                <li key={index} className="list-group-item py-3 px-4 rounded m-1 shadow">
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
                  className="w-50 py-3 mt-2 bg-danger text-light rounded-4 border-1 border-light shadow-sm">
                  <i className="bi bi-x-square"></i> Delete History
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default BMIResult;
