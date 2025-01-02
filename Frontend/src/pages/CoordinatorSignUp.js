import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    margin: "0.8rem 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
};

const buttonStyle = {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const CoordinatorSignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(""); // To handle error messages
    const [success, setSuccess] = useState(""); // To handle success messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Reset error on input change
        setSuccess(""); // Reset success on input change
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Please enter a valid email.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/coordinator/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "coordinator",
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Display success alert
                window.alert("Signup successful! Redirecting to dashboard...");
                setSuccess("Signup successful! Redirecting to dashboard...");
                setTimeout(() => {
                    navigate("/coordinator/student-details"); // Redirect after success
                }, 2000);
            } else {
                // Display error alert
                window.alert(data.error || "Signup failed. Please try again.");
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch (error) {
            // Display error alert for unexpected issues
            window.alert("An error occurred. Please try again.");
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Coordinator Sign Up</h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formData.name}
                    style={inputStyle}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    style={inputStyle}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    style={inputStyle}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    style={inputStyle}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        formData.password !== formData.confirmPassword
                    }
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default CoordinatorSignUp;