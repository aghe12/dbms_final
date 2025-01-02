

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function StdDetails() {
  const [usn, setUsn] = useState("");
  const [username, setUsername] = useState("");
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API call to fetch student details
    setStudentData({
      usn: usn,
      username: username,
      details: "Details provided by the placement coordinator",
    });

    // After form submission, navigate to the StdDetailsView page
    navigate("/StdDetailsView"); // Change this to the actual route of your StdDetailsView page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#4A4A4A" }}>Add Student Details</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#4A4A4A",
              }}
            >
              USN:
            </label>
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                outline: "none",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#4A4A4A",
              }}
            >
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              color: "white",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Submit
          </button>
        </form>
        {studentData && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#4A4A4A" }}>Student Details</h2>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>USN:</strong> {studentData.usn}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}>
              <strong>Username:</strong> {studentData.username}
            </p>
            <p style={{ fontSize: "14px" }}>
              <strong>Details:</strong> {studentData.details}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StdDetails;
