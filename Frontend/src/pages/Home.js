import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // List of background images for the carousel
    const backgroundImages = [
        "https://media.licdn.com/dms/image/v2/C511BAQF20LF5pUubvw/company-background_10000/company-background_10000/0/1584405140606/sahyadri_cover?e=2147483647&v=beta&t=T2shaMDQdZ39TT5wSrfLJ5U1LCNO7Ot1B_5zlO9hqWM",
"https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2024/05/217d0-engineering-colleges-in-dehradun.jpg?fit=1000%2C664&ssl=1",
"https://www.sahyadri.edu.in/_next/image?url=%2Fimages%2Fstartups%2F5.jpg&w=1920&q=75"
]

    // Rotate background images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    const containerStyle = {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        position: "relative",
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim overlay
        zIndex: 1,
    };

    const headingStyle = {
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "2rem",
        color: "#fff",
        zIndex: 2,
    };

    const boxContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.5rem",
        justifyContent: "center",
        zIndex: 2,
    };

    const boxStyle = {
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "1.5rem",
        width: "250px",
        textAlign: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
    };

    const hoverBoxStyle = {
        transform: "scale(1.05)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    };

    const linkStyle = {
        display: "block",
        padding: "0.8rem 1rem",
        backgroundColor: "#4CAF50",
        color: "#fff",
        fontSize: "1.2rem",
        fontWeight: "bold",
        borderRadius: "5px",
        textDecoration: "none",
        transition: "background-color 0.3s",
    };

    const hoverLinkStyle = {
        backgroundColor: "#45a049",
    };

    return (
        <div style={containerStyle}>
            <div style={overlayStyle}></div>
            <h1 style={headingStyle}>Student Placement And Internship Tracker</h1>
            <div style={boxContainerStyle}>
                <div style={boxStyle}>
                    <Link
                        to="/coordinator/signup"
                        style={linkStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = hoverLinkStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = linkStyle.backgroundColor)}
                    >
                        Coordinator Signup
                    </Link>
                </div>
                <div style={boxStyle}>
                    <Link
                        to="/faculty/signup"
                        style={linkStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = hoverLinkStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = linkStyle.backgroundColor)}
                    >
                        Faculty Signup
                    </Link>
                </div>
                {/* <div style={boxStyle}>
                    <Link
                        to="/signup/user"
                        style={linkStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = hoverLinkStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = linkStyle.backgroundColor)}
                    >
                        User Signup
                    </Link>
                </div> */}
                <div style={boxStyle}>
                    <Link
                        to="/login"
                        style={linkStyle}
                        onMouseOver={(e) => (e.target.style.backgroundColor = hoverLinkStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = linkStyle.backgroundColor)}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
