import React from "react";

export default function Loading() {
  return (
    <div className="d-flex gap-3 justify-content-center">
      <div className="spinner-grow text-primary p-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary p-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-success p-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger p-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
