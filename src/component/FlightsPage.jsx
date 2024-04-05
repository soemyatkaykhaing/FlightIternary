import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation ,useNavigate} from 'react-router-dom'; // Import useLocation hook
import { Link } from 'react-router-dom'; // Import Link component

// FlightsPage component
const FlightsPage = () => { // Get location using useLocation hook
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state ; 
  const parsedData = JSON.parse(data);// Safely access location.state.data
  console.log(parsedData.data.itineraries);
  const flights = parsedData.data.itineraries
  console.log(flights)
  const handleFlightSelect = (flight, index) => {
    navigate('/flight-detail', {
      state: { flight, selectedIndex: index }
    });
  };
  return (
    <div className="container mt-4">
      <h1>Available Flights</h1>
      <ul className="list-group mt-3">
        
        {flights && flights.map((flight, index) => ( 
          
          <li key={index} className="list-group-item">
          
            <div>
              <Row>Airline: {flight.legs[0].carriers.marketing[0].name}</Row>
              <Row>
              <Col>Departure: {flight.legs[0].departure}</Col>
              <Col>Arrival: {flight.legs[0].arrival}</Col>
              </Row>
              <span>Duration: {flight.legs[0].durationInMinutes}</span>
            </div>
            <Row>
              <Col>Departure Airport: {flight.legs[0].origin.name}</Col>
              <Col>Arrival Airport: {flight.legs[0].destination.name}</Col>
            </Row>
            <div>
              <Row>Airline: {flight.legs[1].carriers.marketing[0].name}</Row>
              <Row>
              <Col>Departure: {flight.legs[1].departure}</Col>
              <Col>Arrival: {flight.legs[1].arrival}</Col>
              </Row>
              <span>Duration: {flight.legs[1].durationInMinutes}</span>
            </div>
            <Row>
              <Col>Departure Airport: {flight.legs[1].origin.name}</Col>
              <Col>Arrival Airport: {flight.legs[1].destination.name}</Col>
            </Row>
            <div>
              
              <span>Price: {flight.price.formatted}</span>
            </div>
            {console.log(flight)}
            <button
              onClick={() => handleFlightSelect(flight, index)}
              className="btn btn-primary mt-2"
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
  
export default FlightsPage;
