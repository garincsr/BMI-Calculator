import React, { useEffect, useState } from "react";

function WithLoading(WrappedComponent, storedHistory) {
  return function EnhancedComponent() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setHistory(storedHistory);
        setLoading(false);
      }, 1000);
    }, []);

    if (loading) {
      return (
        <div className="d-flex justify-content-center my-4 gap-3">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return <WrappedComponent items={history} />;
  };
}

export default WithLoading;
