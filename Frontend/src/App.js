import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import CoordinatorSignUp from "./pages/CoordinatorSignUp";
import FacultySignUp from "./pages/FacultySignUp";
import Dashboard from "./pages/Dashboard";
import StudentDetails from "./pages/coordinator/StudentDetails";  // Coordinator's student management
import DetailsPage from "./pages/coordinator/Tables";  // Coordinator's details page
import Dashboard2 from "./pages/Dashboard2";  // Faculty dashboard
import StdDetails from "./pages/faculty/StdDetails";  // Faculty student details management
import StdDetailsView from "./pages/faculty/StdDetailsView";  // Faculty view student details

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/coordinator/signup" element={<CoordinatorSignUp />} />
                <Route path="/faculty/signup" element={<FacultySignUp />} />

                {/* Coordinator Routes */}
                <Route path="/coordinator/dashboard" element={<Dashboard />} />
                <Route path="/coordinator/student-details" element={<StudentDetails />} />  {/* Student management */}
                <Route 
                    path="/coordinator/details-page" 
                    element={<DetailsPage 
                        internship={{/* Example data for internship */}} 
                        interview={{/* Example data for interview */}} 
                        placement={{/* Example data for placement */}} 
                        recruiter={{/* Example data for recruiter */}} 
                        skill={{/* Example data for skill */}} 
                    />} 
                /> {/* Coordinator's details page */}

                {/* Faculty Routes */}
                <Route path="/faculty/dashboard" element={<Dashboard2 />} />
                <Route path="/faculty/std-details" element={<StdDetails />} />  {/* Faculty student details management */}
                <Route path="/faculty/std-details-view" element={<StdDetailsView />} />  {/* View student details */}
            </Routes>
        </Router>
    );
}

export default App;
