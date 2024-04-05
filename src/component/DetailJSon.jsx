import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FileSaver from 'file-saver';
import flightsData from './flights_data.json'; // Importing JSON file

const DetailJSon = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Set flights data from imported JSON file
    console.log(flightsData)
    setFlights(flightsData);
  }, []); 

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
            <Container>
              <Row>
              <Col className='col-2'> <b>Departure </b> </Col> 
               <Col >{flight.legs[0].departure.substring(0,10)}</Col>
              </Row>
              <Row>
                <Col className='col-4'>{flight.legs[0].departure.substring(11)}</Col>
                <Col className='col-4'>
                <span style={{ marginRight: '10px' }}>{Math.floor(flight.legs[0].durationInMinutes / 60)}Hours</span> 
                <span className='ml-2'>{flight.legs[0].durationInMinutes  % 60}Minutes</span> 
                </Col>
                <Col className='col-4'>{flight.legs[0].arrival.substring(11)}</Col>
              </Row>
              <Row>
  {flight.legs[0].segments.map((segment, index) => (
    <Row key={index}>
      <Col><span style={{ marginRight: '10px' }}>{segment.origin.parent.displayCode}</span> 
      <span className='ml-2'>{segment.origin.parent.name}</span>
      </Col>
      <Col>
      <span style={{ marginRight: '10px' }}>{Math.floor(segment.durationInMinutes / 60)} Hours</span> 
      <span className='ml-2'>{segment.durationInMinutes % 60} Minutes</span>
      </Col>
      <Col>
      <span style={{ marginRight: '10px' }}>{segment.destination.parent.displayCode}</span> 
      <span className='ml-2'>{segment.destination.parent.name}</span>
      </Col>
    </Row>
  ))}
  <hr></hr>
</Row>
 </Container>
          
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
  

export default DetailJSon;
