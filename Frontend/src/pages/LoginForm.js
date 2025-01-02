import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const style = {
    // Login Form Container
    loginContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        width: "100%",
        maxWidth: "400px",
    },

    h1: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
        fontSize: "36px",
    },

    form: {
        display: "flex",
        flexDirection: "column",
    },

    label: {
        fontSize: "18px",
        marginBottom: "8px",
        color: "#333",
    },

    input: {
        padding: "10px",
        margin: "10px 0 20px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s",
    },

    button: {
        backgroundColor: "#0066cc",
        color: "white",
        fontSize: "18px",
        padding: "12px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },

    buttonHover: {
        backgroundColor: "#004d99",
    },

    error: {
        color: "red",
        marginBottom: "10px",
        textAlign: "center",
    },
};

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("authToken", data.token);
                if (data.user.role === "coordinator") {
                    navigate("/coordinator/dashboard");
                } else if (data.user.role === "faculty") {
                    navigate("/faculty/dashboard");
                }
            } else {
                setError(data.error || "Invalid login credentials. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.");
        }
    };

    return (
        <div style={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
            <div style={style.loginContainer}>
                <h1 style={style.h1}>Login</h1>
                {error && <div style={style.error}>{error}</div>}
                <form style={style.form} onSubmit={handleLogin}>
                    <label style={style.label}>
                        Email:
                        <input
                            style={style.input}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email"
                            autoComplete="email"
                        />
                    </label>
                    <label style={style.label}>
                        Password:
                        <input
                            style={style.input}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                            autoComplete="current-password"
                        />
                    </label>
                    <button
                        style={isHovering ? { ...style.button, ...style.buttonHover } : style.button}
                        type="submit"
                        onMouseOver={() => setIsHovering(true)}
                        onMouseOut={() => setIsHovering(false)}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
