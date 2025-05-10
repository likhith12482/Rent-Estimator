
import React, { useState, useEffect } from "react";

const bikeTypes = ["Standard", "Cruiser", "Sports", "Scooter"];
const cities = ["Hyderabad", "Bangalore", "Chennai", "Mumbai"];

export default function BikeRental({ goBack }) {
  const [city, setCity] = useState("Hyderabad");
  const [bikeType, setBikeType] = useState("Standard");
  const [days, setDays] = useState(1);
  const [helmet, setHelmet] = useState(false);
  const [rent, setRent] = useState(0);

  useEffect(() => {
    let baseRate = 300;

    if (bikeType === "Cruiser") baseRate = 500;
    if (bikeType === "Sports") baseRate = 700;
    if (bikeType === "Scooter") baseRate = 400;

    if (city === "Mumbai") baseRate += 50;
    if (city === "Bangalore") baseRate += 30;

    let total = baseRate * days;
    if (helmet) total += days * 50;

    setRent(total);
  }, [bikeType, city, days, helmet]);

  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <h2>🏍️ Bike Rent Estimator</h2>

      <div className="form">
        <div>
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Bike Type</label>
          <select value={bikeType} onChange={(e) => setBikeType(e.target.value)}>
            {bikeTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Number of Days: {days}</label>
          <input
            type="range"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        <label>
          <input
            type="checkbox"
            checked={helmet}
            onChange={(e) => setHelmet(e.target.checked)}
          />
          Helmet (+₹50/day)
        </label>
      </div>

      <div className="result">
        <h2>Estimated Rent: ₹ {rent.toLocaleString()} for {days} day(s)</h2>
        <p>{bikeType} in {city} {helmet ? "with helmet" : ""}</p>
      </div>
    </div>
  );
}
