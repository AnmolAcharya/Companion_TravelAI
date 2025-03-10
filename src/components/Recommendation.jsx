import React from 'react';

function Recommendation() {
  const destinations = [
    {
      name: "The Venetian Resort",
      location: "Las Vegas, NV, USA",
      image: "/lasvegas.jpg",
      description: "A luxurious casino resort with gondola rides.",
      googleMaps: "https://www.google.com/maps?q=The+Venetian+Resort,Las+Vegas,NV,USA"
    },
    {
      name: "The London Bridge",
      location: "United Kingdom, Europe",
      image: "/londonbridge.jpg",
      description: "A historic bridge connecting London.",
      googleMaps: "https://www.google.com/maps?q=London+Bridge,United+Kingdom"
    },
    {
      name: "Santorini",
      location: "Greece, Europe",
      image: "/santorinii.jpg",
      description: "Famous for white-washed houses and stunning sunsets.",
      googleMaps: "https://www.google.com/maps?q=Santorini,Greece"
    },
    {
      name: "Aurora",
      location: "Finland, Europe",
      image: "/finland.avif",
      description: "A breathtaking destination to view the Northern Lights.",
      googleMaps: "https://www.google.com/maps?q=Finland+Northern+Lights"
    },
    {
      name: "Bahamas",
      location: "Bahamas, Caribbean",
      image: "/bahamas.jpg",
      description: "A paradise of beaches and crystal-clear waters.",
      googleMaps: "https://www.google.com/maps?q=Bahamas"
    },
    {
      name: "Annapurna Mountain",
      location: "Pokhara, Nepal",
      image: "/annapurna.jpg",
      description: "A trekking paradise with stunning Himalayan views.",
      googleMaps: "https://www.google.com/maps?q=Annapurna+Mountain,Nepal"
    },
    {
      name: "Mount Kilimanjaro",
      location: "Tanzania, Africa",
      image: "/africa.jpg",
      description: "Africa's highest peak, a must for climbers.",
      googleMaps: "https://www.google.com/maps?q=Mount+Kilimanjaro,Tanzania"
    },
    {
      name: "Rara Lake",
      location: "Mugu, Karnali, Nepal",
      image: "/rara.jpg",
      description: "Nepal’s largest and most pristine lake.",
      googleMaps: "https://www.google.com/maps?q=Rara+Lake,Nepal"
    },
    {
      name: "Blue Mosque",
      location: "Istanbul, Turkey",
      image: "/turkiye.jpg",
      description: "A magnificent mosque known for its blue tiles.",
      googleMaps: "https://www.google.com/maps?q=Blue+Mosque,Istanbul,Turkey"
    },
    {
      name: "Rio De Janeiro",
      location: "Brazil, South America",
      image: "/brazil.avif",
      description: "Famous for Carnival, beaches, and Christ the Redeemer.",
      googleMaps: "https://www.google.com/maps?q=Rio+De+Janeiro,Brazil"
    }
  ];

  return (
    <section className="recommendations-section">
      <h2>Popular Destinations</h2>
      <div className="hotel-grid">
        {destinations.map((destination, index) => (
          <a 
            key={index}
            href={destination.googleMaps} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hotel-card-link"
          >
            <div className="hotel-card">
              <img src={destination.image} alt={destination.name} className="hotel-image" />
              <div className="hotel-info">
                <h3>{destination.name}</h3>
                <p className="location">{destination.location}</p>
                <p className="description">{destination.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Recommendation;
