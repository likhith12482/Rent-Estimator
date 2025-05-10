import React, { useState, useEffect } from "react";

const cities = ["Hyderabad", "Bangalore", "Chennai", "Mumbai"];

export default function HouseRental({ goBack }) {
  const [city, setCity] = useState("Hyderabad");
  const [bedrooms, setBedrooms] = useState(2);
  const [sqft, setSqft] = useState(800);
  const [furnished, setFurnished] = useState(false);
  const [amenities, setAmenities] = useState({ ac: false, parking: false });
  const [rent, setRent] = useState(0);

  useEffect(() => {
    let base = 5000;
    if (city === "Bangalore") base = 6000;
    if (city === "Mumbai") base = 8000;
    if (city === "Chennai") base = 5500;

    let calcRent = base + sqft * 10 + bedrooms * 3000;
    if (furnished) calcRent += 5000;
    if (amenities.ac) calcRent += 1500;
    if (amenities.parking) calcRent += 1000;

    setRent(calcRent);
  }, [city, bedrooms, sqft, furnished, amenities]);

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <h2>🏠 House Rent Estimator</h2>

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
          <label>Bedrooms: {bedrooms}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Square Footage: {sqft} sqft</label>
          <input
            type="range"
            min="300"
            max="2000"
            step="50"
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
          />
        </div>

        <label>
          <input
            type="checkbox"
            checked={furnished}
            onChange={(e) => setFurnished(e.target.checked)}
          />
          Furnished
        </label>

        <label>
          <input
            type="checkbox"
            checked={amenities.ac}
            onChange={() => toggleAmenity("ac")}
          />
          Air Conditioner
        </label>

        <label>
          <input
            type="checkbox"
            checked={amenities.parking}
            onChange={() => toggleAmenity("parking")}
          />
          Parking
        </label>
      </div>

      <div className="result">
        <h2>Estimated Rent: ₹ {rent.toLocaleString()} / month</h2>
        <p>
          {bedrooms} BHK | {sqft} sqft in {city}
        </p>
      </div>
    </div>
  );
}
