// 
// import React, { useState } from "react"; // Importing useState
// import { useNavigate } from "react-router-dom"; // Importing useNavigate

// const StudentDetails = () => {
//   const [formData, setFormData] = useState({
//     studentname: "",
//     usn: "",
//     email: "",
//     yearofraduation: "",
//     specialization: "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null); // State to handle error messages
//   const navigate = useNavigate(); // Initialize the navigate hook

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(false);
//     setErrorMessage(null);

//     try {
//       const response = await fetch("http://localhost:5000/api/students", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSubmitted(true);
//         setTimeout(() => {
//           navigate("/details-page"); // Redirect to DetailsPage after successful submission
//         }, 3000);
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Submission failed. Try again.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred. Please check your connection.");
//     }
//   };

//   const containerStyle = {
//     maxWidth: "600px",
//     margin: "50px auto",
//     padding: "30px",
//     background: "#ffffff",
//     boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
//     borderRadius: "10px",
//     textAlign: "center",
//     fontFamily: "'Roboto', sans-serif",
//     animation: "fadeIn 1.5s ease-in-out",
//   };

//   const headerStyle = {
//     fontSize: "2.2rem",
//     color: "#333",
//     marginBottom: "20px",
//     fontWeight: "600",
//   };

//   const formStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "15px",
//     fontSize: "1rem",
//     border: "2px solid #ddd",
//     borderRadius: "8px",
//     transition: "border-color 0.3s ease, box-shadow 0.3s ease",
//     backgroundColor: "#f8f8f8",
//     outline: "none",
//   };

//   const buttonStyle = {
//     padding: "15px",
//     fontSize: "1.2rem",
//     color: "#fff",
//     background: "#4caf50",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     transition: "background 0.3s ease, transform 0.2s ease",
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headerStyle}>Student Details</h2>
//       {submitted && <p style={{ color: "#28a745" }}>Details submitted successfully!</p>}
//       {errorMessage && <p style={{ color: "#dc3545" }}>{errorMessage}</p>}
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <input
//           name="studentName"
//           type="text"
//           placeholder="Student Name"
//           value={formData.studentName}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <input
//           name="usn"
//           type="text"
//           placeholder="USN"
//           value={formData.usn}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <input
//           name="yearOfGraduation"
//           type="number"
//           placeholder="Year of Graduation"
//           value={formData.yearOfGraduation}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <input
//           name="specialization"
//           type="text"
//           placeholder="Specialization"
//           value={formData.specialization}
//           onChange={handleChange}
//           style={inputStyle}
//         />
//         <button type="submit" style={buttonStyle}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentDetails;







import React, { useState } from "react"; // Importing useState
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    studentname: "", // Correcting key names
    usn: "",
    email: "",
    yearofgraduation: "",
    specialization: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // State to handle error messages
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitted(false);
  //   setErrorMessage(null);

  //   try {
  //     const response = await fetch("http://localhost:5000/api/students", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       setSubmitted(true);
  //       setTimeout(() => {
  //         navigate("/coordinator/details-page"); // Redirect to DetailsPage after successful submission
  //       }, 3000);
  //     } else {
  //       const errorData = await response.json();
  //       setErrorMessage(errorData.message || "Submission failed. Try again.");
  //     }
  //   } catch (error) {
  //     setErrorMessage("An error occurred. Please check your connection.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setErrorMessage(null);
  
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          navigate("/coordinator/details-page"); // Redirect after submission
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Submission failed. Try again.");
      }
    } catch (error) {
      setErrorMessage("A network error occurred. Please check your connection.");
    }
  };
  
  const containerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    background: "#ffffff",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    animation: "fadeIn 1.5s ease-in-out",
  };

  const headerStyle = {
    fontSize: "2.2rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "600",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    fontSize: "1rem",
    border: "2px solid #ddd",
    borderRadius: "8px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#f8f8f8",
    outline: "none",
  };

  const buttonStyle = {
    padding: "15px",
    fontSize: "1.2rem",
    color: "#fff",
    background: "#4caf50",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Student Details</h2>
      {submitted && <p style={{ color: "#28a745" }}>Details submitted successfully!</p>}
      {errorMessage && <p style={{ color: "#dc3545" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="studentname"
          type="text"
          placeholder="Student Name"
          value={formData.studentname} // Updated the key to match state key
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="usn"
          type="text"
          placeholder="USN"
          value={formData.usn}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="yearofgraduation"
          type="number"
          placeholder="Year of Graduation"
          value={formData.yearofgraduation}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="specialization"
          type="text"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentDetails;