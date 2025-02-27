import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import WeightandAge from "./WeightandAge";
import User from "./User";
import BMIHistory from "./BMIHistory";
import WithLoading from "./WithLoading";

function BMIResult() {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(20);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [history, setHistory] = useState([]);

  const storedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];

  // useEffect(() => {
  //   const storedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  //   setHistory(storedHistory);
  // }, []);

  const BMIHistoryWithLoading = WithLoading(BMIHistory, storedHistory);

  const calculateBMI = () => {
    if (!name.trim() || !gender.trim()) {
      alert("Please enter your name and your gender");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);

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

    const newEntry = {
      name,
      gender,
      height,
      weight,
      bmi: bmiValue,
      category: bmiCategory,
    };

    const updatedHistory = [newEntry, ...history.slice(0, 4)];
    setHistory(updatedHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="w-full shadow p-3 mx-auto">
      <div className="container d-flex w-auto flex-column justify-content-center my-3">
        <h1 className="fw-bold text-center">BMI CALCULATOR</h1>
        <p className="fst-italic fw-light text-center">
          The BMI Calculator calculates the ideal body weight for individuals
          aged 18-65 years.
        </p>
      </div>

      <div className="container h-auto w-auto">
        <User name={name} setName={setName} setGender={setGender} />
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

          {bmi && (
            <>
              <h3>
                Your BMI: <span className="text-primary">{bmi}</span>
              </h3>
              <p>Category: {category}</p>
            </>
          )}
        </div>

        {/* List History */}
        <BMIHistoryWithLoading />
      </div>
    </div>
  );
}

export default BMIResult;
