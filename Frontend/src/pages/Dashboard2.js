import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FacultyDashboard() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [queryOutput, setQueryOutput] = useState(null);

  const handleDropdownChange = async (e) => {
    const selectedQuery = e.target.value;
    setSelectedOption(selectedQuery);

    if (selectedQuery) {
      try {
        console.log(selectedQuery)
        const response = await fetch(`http://localhost:5000/api/faculty/query/${selectedQuery}`);

        const data = await response.json();

        if (data.success) {
          setQueryOutput(data.output);
        } else {
          setQueryOutput("Error fetching data.");
        }
      } catch (error) {
        setQueryOutput("Error connecting to the server.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "pink",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Faculty Dashboard</h1>

        {/* Buttons */}
        {/* <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => navigate("/faculty/stddetails")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Student Details
          </button>
        </div> */}

        {/* Dropdown */}
        <div style={{ marginBottom: "30px" }}>
          <label
            htmlFor="dropdown"
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#4A4A4A",
            }}
          >
            Select an Option:
          </label>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              outline: "none",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
            }}
          >
            <option value="" disabled>
              -- Choose an option --
            </option>
            {[
              "All students",
              "Get all students who have applied for internships",
              "Get all students who have been placed",
              "Get students who have applied for more than 2 internships",
              "Get students who have a specific skill",
              "Find students who have applied to at least two internships with the same recruiter",
              "Get the number of students placed per year of graduation"


              // Add more options dynamically...
            ].map((query, index) => (
              <option key={index} value={query}>
                {query}
              </option>
            ))}
          </select>
        </div>

        {/* Output Box */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "left",
            minHeight: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {queryOutput ? (
            Array.isArray(queryOutput) ? (
              queryOutput.length > 0 ? (
                queryOutput.map((item, index) => (
                  <div key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <p>No data available.</p>
              )
            ) : (
              <pre>{JSON.stringify(queryOutput, null, 2)}</pre>
            )
          ) : (
            <p style={{ fontSize: "14px", color: "#aaa", textAlign: "center" }}>
              Select an option from the dropdown to see the output.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
