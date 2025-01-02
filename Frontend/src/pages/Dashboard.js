import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verify token and handle redirection
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/coordinator/signup"); // Redirect to signup if not logged in
    } else {
      // Verify token with backend
      verifyToken(token);
    }
    setIsLoaded(true);
  }, [navigate]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("/api/coordinator/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true); // Token is valid
      } else {
        localStorage.removeItem("authToken");
        navigate("/coordinator/signup"); // Redirect to signup if token is invalid
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem("authToken");
      navigate("/coordinator/signup"); // Redirect if there's an error
    }
  };

  const containerStyle = {
    padding: "3rem",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    color: "#fff",
    backgroundColor: "#000",
    fontFamily: "'Roboto', sans-serif",
  };

  const headerStyle = {
    fontSize: "3rem",
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "2rem",
    color: "#f8f8f8",
  };

  const dashboardOptionsStyle = {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    marginBottom: "3rem",
  };

  const linkStyle = (index) => ({
    display: "inline-block",
    padding: "1rem 2rem",
    borderRadius: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    boxShadow: "0 4px 8px rgba(241, 18, 18, 0.1)",
    transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
    opacity: isLoaded ? 1 : 0,
    animation: isLoaded ? `fadeIn 1s ease-out forwards ${index * 0.2}s` : "none",
  });

  const scrollToContent = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const carouselStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "-1",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const carouselImagesStyle = {
    position: "absolute",
    width: "300%",
    height: "100%",
    animation: "slide 15s infinite",
  };

  const carouselImageStyle = {
    display: "inline-block",
    width: "33.33%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const carouselBeforeStyle = {
    content: '""',
    backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhOsLU_jEiEkamHrNJOsSPRCWnTjaqLhS-A&s')",
  };

  const carouselAfterStyle = {
    content: '""',
    backgroundImage:
      "url('https://images.shiksha.com/mediadata/images/1524131579phpsbmi2K.png')",
  };

  const carouselDivStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1515166860056-dc09182f36f7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MjV8fG1lZGl0ZXJ8ZW58MHx8fHwxNjk4MzA4MTk4&ixlib=rb-1.2.1&q=80&w=1080')",
  };

  const slideAnimation = {
    "0%": { transform: "translateX(0)" },
    "33.33%": { transform: "translateX(-33.33%)" },
    "66.66%": { transform: "translateX(-66.66%)" },
    "100%": { transform: "translateX(0)" },
  };

  if (!isLoggedIn) {
    return <div>Loading... or Please log in.</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Coordinator Dashboard</h1>
      <div style={dashboardOptionsStyle}>
        <button style={linkStyle(0)} onClick={scrollToContent}>
          About
        </button>
        <Link to="/coordinator/student-details" style={linkStyle(1)}>
          Student Details
        </Link>
      </div>

      <div
        id="about-section"
        style={{
          marginTop: "5rem",
          color: "white",
          textAlign: "left",
        }}
      >
        <h2>About Section</h2>
        <p>This section contains information about the college...</p>
      </div>

      {/* Carousel Container */}
      <div style={carouselStyle}>
        <div style={carouselImagesStyle}>
          <div style={{ ...carouselImageStyle, ...carouselBeforeStyle }} />
          <div style={carouselDivStyle} />
          <div style={{ ...carouselImageStyle, ...carouselAfterStyle }} />
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          a:hover, button:hover {
            background-color: #0056b3;
            transform: translateY(-6px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            33.33% {
              transform: translateX(-33.33%);
            }
            66.66% {
              transform: translateX(-66.66%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 2rem;
            }

            button, a {
              padding: 1rem;
              font-size: 0.9rem;
              width: 150px;
            }

            .carousel-images::before,
            .carousel-images::after,
            .carousel-images div {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
