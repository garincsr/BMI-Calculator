import React from "react";

function Slider(props) {
  const { height, setHeight } = props;
  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setHeight("");
    } else {
      setHeight(parseInt(value, 10));
    }
  };

  const handleBlur = () => {
    let value = height;
    if (isNaN(value) || value < 100) {
      value = 100;
    } else if (value > 200) {
      value = 200;
    }
    setHeight(value);
  };

  return (
    <div className="d-flex flex-column align-items-center px-3 py-4 bg-light rounded shadow w-100">
      <h2 className="text-lg font-semibold">
        Body Height:{" "}
        <input
          type="number"
          min="100"
          max="200"
          value={height}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="input-number"
        />{" "}
        cm
      </h2>

      {/* Slider */}
      <input
        type="range"
        min="100"
        max="200"
        value={height === "" ? 100 : height}
        onChange={handleInputChange}
        className="w-75 accent-blue-500"
      />
    </div>
  );
}

export default Slider;
