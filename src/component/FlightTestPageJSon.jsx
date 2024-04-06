import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FileSaver from 'file-saver';
import flightsData from './flights_data.json'; // Importing JSON file

const FlightTestPageJSon = () => {
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
    <div className="container mt-4" style={{ fontSize: '20px'}}>
     
      <h1>Available Flights</h1>
      <ul className="list-group mt-3 ">
        {flights && flights.map((flight, flightIndex) => (
          <li key={flightIndex} className="list-group-item text-align-center mb-4 rounded ticket ">
            <Container>
              {flight.legs.map((leg, legIndex) => (
                <div key={legIndex}>
                  <Row>
                    <Col className='col-3'><b style={{ fontSize: '36px', display: 'block' }}>{legIndex === 0 ? "Departure" : "Return"}</b></Col>
                    <Col className='justify-content-center col-3' style={{ display: 'flex', alignItems: 'center' }}><b>{leg.departure.substring(0, 10)}</b></Col>
                  </Row>
                  <br/>

                  <Row>
                    <Col className='col-4'>{leg.departure.substring(11)}</Col>
                    <Col className='col-4 justify-content-start'>
                      <span >{Math.floor(leg.durationInMinutes / 60)}Hours</span>
                      <span className='ml-5'>{leg.durationInMinutes % 60}Minutes</span>
                    </Col>
                    <Col className='col-4 d-flex justify-content-center'>{leg.arrival.substring(11)}</Col>
                  </Row>
                  <Row>
                    <Col><span style={{ marginRight: '10px',color: 'grey', fontSize: '36px' }}>{leg.origin.displayCode}</span>
                      <span className='ml-2' style={{ marginRight: '10px',color: 'grey', fontSize: '36px' }}>{leg.origin.name}</span>
                    </Col>
                    <Col>
                      <span className='ml-4'>{leg.stopCount} Stop</span>
                    </Col>
                    <Col className='col-4 d-flex justify-content-center'>
                      <span  style={{ color: 'grey', fontSize: '36px' }}>{leg.destination.displayCode}</span>
                      <span className='mr-5'  style={{ color: 'grey', fontSize: '36px' }}>{leg.destination.name}</span>
                    </Col>
                  </Row>
                  <br/>
                  
                </div>
              ))}
              <Row className="justify-content-end">
                <Col style={{ fontSize: '30px', color:'darkblue' }}>
                  Price: {flight.price.formatted}
                </Col>
                <Col className='mt-2 col-2 d-flex justify-content-end'>
                  <button
                    onClick={() => handleFlightSelect(flight, flightIndex)}
                    className="btn todo-button"
                    style={{ fontSize: '20px' }}
                  >
                    Select
                  </button>
                </Col>
              </Row>
            </Container>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default FlightTestPageJSon;
