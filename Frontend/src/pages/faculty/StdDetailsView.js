

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function StdDetailsView() {
  const { id } = useParams(); // Get student ID from the route params
  const [studentData, setStudentData] = useState(null); // State for student data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch student data from the backend
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch student data: ${response.status}`);
        }
        const data = await response.json();
        setStudentData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

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
        <h1 style={{ marginBottom: "20px", color: "#4A4A4A" }}>Student Details</h1>
        {studentData ? (
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
            <h2 style={{ marginBottom: "10px", color: "#4A4A4A" }}>
              Details for {studentData.username}
            </h2>
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
        ) : (
          <p>No student data found.</p>
        )}
      </div>
    </div>
  );
}

export default StdDetailsView;
