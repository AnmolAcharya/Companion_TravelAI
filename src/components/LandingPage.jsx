import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Navigation for redirection
import "./LandingPage.css";

function LandingPage() {
  const [startAnimation, setStartAnimation] = useState(false);
  const navigate = useNavigate(); // Navigation hook
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move details INSIDE the function scope
  const details = [
    "Get tailored hotel recommendations based on your preferences.",
    "Explore top-rated attractions and hidden gems curated for you.",
    "Save time with AI-powered suggestions for your perfect itinerary.",
    "Plan effortlessly with smart insights and travel tips."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % details.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [details.length]);

  const handleClick = () => {
    setStartAnimation(true);
    setTimeout(() => {
      navigate("/create-trip"); // Navigate after animation completes
    }, 3200); // Extended animation time (6s for smooth effect)
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Your AI Travel Companion</h1>
        <h2>Discover Hotels and Attractions Handpicked by AI</h2>
        
        {/* Rotating details animation */}
        <div className="rotating-details-container">
          <p className="rotating-details">{details[currentIndex]}</p>
        </div>
        
        {/* Only Button Inside Blurred Box */}
        <div className="blurred-button-container">
          <button className="plan-trip-btn" onClick={handleClick}>
            Plan My Trip
          </button>
        </div>
      </div>

      {/* Plane Animation -- full on loops */}
      {startAnimation && (
        <div className="plane-container">
          <img src="/planed_processed.webp" alt="Plane" className="plane" />
          <div className="dotted-path"></div>
        </div>
      )}
    </section>
  );
}

export default LandingPage;

