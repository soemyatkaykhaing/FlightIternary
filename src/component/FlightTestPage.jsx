import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import FileSaver from 'file-saver';


const FlightTestPage = () => {

  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
        const url = 'https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=eyJlIjoiOTU1NjUwODUiLCJzIjoiQkNOIiwiaCI6IjI3NTQ4MjgzIn0%3D&toEntityId=eyJlIjoiOTU2NzM3NDQiLCJzIjoiTlVFIiwiaCI6IjI3NTQ1MTYyIn0%3D&departDate=2024-04-11&returnDate=2024-04-18';      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '91ed51a6e0msh7a31b1ca7cd5bb5p1adee1jsn05206a65005c',
          'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        setFlights(result.data.itineraries);
        saveFlightsToFile(result.data.itineraries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlights();
  }, []); 

  const handleFlightSelect = (flight, index) => {
    navigate('/flight-detail', {
      state: { flight, selectedIndex: index }
    });
  };
  const saveFlightsToFile = (flightsData) => {
    const json = JSON.stringify(flightsData);
    const blob = new Blob([json], { type: 'application/json' });
    FileSaver.saveAs(blob, 'flights_data.json');
  };


  return (
    <div className="container mt-4">
      <h1>Available Flights</h1>
      <ul className="list-group mt-3">
        {flights.map((flight, index) => (
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

export default FlightTestPage;
