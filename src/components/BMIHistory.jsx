import React from "react";

function BMIHistory(props) {
  const { items } = props;

  const deleteHitory = () => {
    if (confirm("You sure want to delete all BMI history ?")) {
      localStorage.removeItem("bmiHistory");
      setHistory([]);
    }
  };

  return (
    <>
      {items.length > 0 && (
        <div className="mt-4 mb-5 text-center">
          <h3 className="fw-bold p-3 mb-2 bg-success text-light rounded-pill">
            -- Users History --
          </h3>
          <ul className="list-group text-start rounded">
            {items.map((val, index) => (
              <li
                key={index}
                className="list-group-item py-3 px-4 rounded m-1 shadow"
              >
                <h4 className="fw-bold">
                  {val.name} ({val.gender})
                </h4>{" "}
                {val.bmi} - {val.category}
              </li>
            ))}
            <div className="d-flex justify-content-end mt-2">
              <button
                onClick={deleteHitory}
                className="w-50 py-3 mt-2 bg-danger text-light rounded-4 border-1 border-light shadow-sm"
              >
                <i className="bi bi-x-square"></i> Delete History
              </button>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

export default BMIHistory;
