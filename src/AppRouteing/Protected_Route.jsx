import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import bgImage from "../Assets/bg.png";
import Navbar from "../Compoents/Navbar";

const Protected_Route = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:4000/backend/validateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid === true) {
            setIsAuthenticated(true);
          } else {
            localStorage.clear();
          }
          setLoading(false); // Stop loading after the response
        })
        .catch((error) => {
          console.error("Error during token validation:", error);
          setLoading(false); // Stop loading on error
        });
    } else {
      console.log("No Token");
      setLoading(false); 
    }
  }, []);

  if (loading) {
    // Show a loading spinner or message while authentication is being verified
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div
          className="h-[1200px] md:h-[100vh] bg-cover bg-center p-2 font-serif"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="h-[7%]">
            <Navbar />
          </div>
          <div className="h-[93%]">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Protected_Route;
