import React, { useEffect, useState } from "react";
 import "./TipsPage.css";
const Tips = () => {
  const [tip, setTip] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTip = () => {
    setLoading(true);
    setError("");
    fetch("http://graduationapp.test/api/external-health-tip")  
      .then((res) => res.json())
      .then((data) => {
        if (data.title) {
          setTip(data);
        } else {
          setError("No tip found.");
        }
      })
      .catch(() => setError("Failed to connect to the API."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="tip-container">
      <h2>💡 Health Tip of the Day</h2>
      {error && <p className="error">{error}</p>}
      {tip && (
        <>
          <div key={tip.title} className="tip-card fade-in">
            <h3>{tip.title}</h3>
            <p className="category"><strong>Category:</strong> {tip.category}</p>
            {tip.image && <img src={tip.image} alt="tip" className="tip-image" />}
            <p>
              <a href={tip.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </p>
          </div>

          <div className="btn-wrapper">
            <button className="refresh-btn" onClick={fetchTip} disabled={loading}>
              {loading ? "Loading..." : "Get another tip"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tips;
