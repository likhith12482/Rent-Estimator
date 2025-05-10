import React, { useState, useEffect } from "react";

const carTypes = ["Hatchback", "Sedan", "SUV", "Luxury"];
const cities = ["Hyderabad", "Bangalore", "Chennai", "Mumbai"];

export default function CarRental({ goBack }) {
  const [city, setCity] = useState("Hyderabad");
  const [carType, setCarType] = useState("Hatchback");
  const [days, setDays] = useState(1);
  const [withDriver, setWithDriver] = useState(false);
  const [rent, setRent] = useState(0);

  useEffect(() => {
    let baseRate = 1000;

    if (carType === "Sedan") baseRate = 1500;
    if (carType === "SUV") baseRate = 2000;
    if (carType === "Luxury") baseRate = 4000;

    if (city === "Mumbai") baseRate += 200;
    if (city === "Bangalore") baseRate += 100;

    let total = baseRate * days;
    if (withDriver) total += days * 500;

    setRent(total);
  }, [carType, city, days, withDriver]);

  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <h2>🚗 Car Rent Estimator</h2>

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
          <label>Car Type</label>
          <select value={carType} onChange={(e) => setCarType(e.target.value)}>
            {carTypes.map((type) => (
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
            checked={withDriver}
            onChange={(e) => setWithDriver(e.target.checked)}
          />
          With Driver (+₹500/day)
        </label>
      </div>

      <div className="result">
        <h2>Estimated Rent: ₹ {rent.toLocaleString()} for {days} day(s)</h2>
        <p>{carType} in {city} {withDriver ? "with driver" : "without driver"}</p>
      </div>
    </div>
  );
}
