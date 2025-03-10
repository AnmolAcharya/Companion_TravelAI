import React from 'react';
import './Display.css';

function About({ trip }) {
  return (
    <div className="about-container">
      {/* Banner Image */}
      <img src={trip?.userSelection?.imageURL || "/placeholder.jpg"} alt="Trip" className="about-banner" />

      {/* Destination Name */}
      <div className="destination-box">
        {trip?.userSelection?.destination || "Destination"} {/*Show the destination */}
      </div>

      {/* Trip Details */}
      <div className="about-details">
        <div className="detail-box">{trip?.userSelection?.noOfDays || "Days"} Days</div>
        <div className="detail-box">{trip?.userSelection?.budget || "Budget"}</div>
        <div className="detail-box">{trip?.userSelection?.travelWith || "Travel With"}</div>
      </div>
    </div>
  );
}

export default About;
