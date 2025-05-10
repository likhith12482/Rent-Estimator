import React, { useState } from "react";
import HouseRental from "./HouseRental";
import CarRental from "./CarRental";
import BikeRental from "./BikeRental";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState(null);

  const goBack = () => setSelected(null);

  return (
    <div className="app">
      {!selected ? (
        <>
          <h1>🏡 RentEase</h1>
          <p className="subtitle">Select a rental category:</p>
          <div className="category-buttons">
            <button onClick={() => setSelected("house")}>🏠 Houses</button>
            <button onClick={() => setSelected("car")}>🚗 Cars</button>
            <button onClick={() => setSelected("bike")}>🏍️ Bikes</button>
          </div>
        </>
      ) : selected === "house" ? (
        <HouseRental goBack={goBack} />
      ) : selected === "car" ? (
        <CarRental goBack={goBack} />
      ) : (
        <BikeRental goBack={goBack} />
      )}
    </div>
  );
}
