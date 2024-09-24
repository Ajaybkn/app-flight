import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowsAltH,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const RoundTrip = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [airports, setAirports] = useState([]);
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredArrivals, setFilteredArrivals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.aviationstack.com/v1/airports?access_key=9e788291ca0afa073d8c41cfde3433b8"
        );
        const data = await response.json();
        setAirports(data.data);
      } catch (error) {
        console.error("Error fetching airports data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDepartureChange = (e) => {
    const input = e.target.value;
    setDeparture(input);
    setFilteredDepartures(
      input.length > 1
        ? airports.filter((airport) =>
            airport.iata_code.toLowerCase().includes(input.toLowerCase())
          )
        : []
    );
  };

  const handleArrivalChange = (e) => {
    const input = e.target.value;
    setArrival(input);
    setFilteredArrivals(
      input.length > 1
        ? airports.filter((airport) =>
            airport.airport_name.toLowerCase().includes(input.toLowerCase())
          )
        : []
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ departure, arrival, departureDate, returnDate, travellers });
  };

  return (
    <form
      className="d-flex flex-wrap align-items-center"
      onSubmit={handleFormSubmit}
      style={{ gap: "6px", marginTop: "20px", padding: "0 10px" }}
    >
      {/* Departure */}
      <div className="position-relative" style={{ flex: "1 1 150px" }}>
        <FontAwesomeIcon
          icon={faLocationDot}
          className="position-absolute"
          style={{
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#333",
          }}
        />
        <input
          type="text"
          value={departure}
          onChange={handleDepartureChange}
          placeholder="DEL"
          className="form-control"
          style={{
            paddingLeft: "40px",
            paddingRight: "10px",
            minHeight: "48px", // Use min-height for better responsiveness
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            borderColor: "#ccc",
          }}
        />
      </div>

      {/* Swap Button */}
      <div
        className="text-center"
        style={{ width: "40px", fontSize: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faArrowsAltH} />
      </div>

      {/* Arrival */}
      <div className="position-relative" style={{ flex: "1 1 150px" }}>
        <FontAwesomeIcon
          icon={faLocationDot}
          className="position-absolute"
          style={{
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#333",
          }}
        />
        <input
          type="text"
          value={arrival}
          onChange={handleArrivalChange}
          placeholder="Anywhere"
          className="form-control"
          style={{
            paddingLeft: "40px",
            paddingRight: "10px",
            minHeight: "48px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            borderColor: "#ccc",
          }}
        />
      </div>

      {/* Departure Date */}
      <div className="position-relative" style={{ flex: "1 1 150px" }}>
        <FontAwesomeIcon
          icon={faCalendar}
          className="position-absolute"
          style={{
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#333",
          }}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="form-control"
          style={{
            paddingLeft: "40px",
            paddingRight: "10px",
            minHeight: "48px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            borderColor: "#ccc",
          }}
        />
      </div>

      {/* Return Date */}
      <div className="position-relative" style={{ flex: "1 1 150px" }}>
        <FontAwesomeIcon
          icon={faCalendar}
          className="position-absolute"
          style={{
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#333",
          }}
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="form-control"
          style={{
            paddingLeft: "40px",
            paddingRight: "10px",
            minHeight: "48px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            borderColor: "#ccc",
          }}
        />
      </div>

      {/* Travellers */}
      <div className="position-relative" style={{ flex: "1 1 120px" }}>
        <FontAwesomeIcon
          icon={faUser}
          className="position-absolute"
          style={{
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#333",
          }}
        />
        <input
          type="number"
          value={travellers}
          onChange={(e) => setTravellers(e.target.value)}
          min="1"
          max="10"
          className="form-control"
          style={{
            paddingLeft: "40px",
            paddingRight: "10px",
            minHeight: "48px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "500",
            borderColor: "#ccc",
          }}
        />
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        style={{
          backgroundColor: "#FF5400",
          border: "none",
          width: "160px",
          minHeight: "48px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Search Flights
      </Button>
    </form>
  );
};

export default RoundTrip;
