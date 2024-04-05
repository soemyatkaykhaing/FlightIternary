import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaDelete, FaLuggageCart, FaMoneyBill } from 'react-icons/fa';
const FlightDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state || {};
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    dob: '',
    passport: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer Info:', customerInfo);
    navigate('/ticket-page', {
      state: { flight, customerInfo }
    });
  };
  const legCarriers = flight.legs.map(leg => leg.carriers);
  return (
    <div className="container mt-4">
      <h1>Flight Detail</h1>
      <Container className="bg-white justify-content-center text-align-center rounded" style={{ fontSize: '30px'}}>
        
              {flight.legs.map((leg, legIndex) => (
                <div key={legIndex}>
                  <Row>
                    <Col className='col-3'><b style={{ fontSize: '36px', display: 'block' }}>{legIndex === 0 ? "Departure" : "Return"}</b></Col>
                    <Col className='justify-content-center ' style={{ display: 'flex', alignItems: 'center' }}><b>{leg.departure.substring(0, 10)}</b></Col>
                  </Row>
                  <br/>

                  <Row>
                    <Col className='col-4'>{leg.departure.substring(11)}</Col>
                    <Col className='col-4'>
                      <span style={{ marginRight: '10px' }}>{Math.floor(leg.durationInMinutes / 60)}Hours</span>
                      <span className='ml-2'>{leg.durationInMinutes % 60}Minutes</span>
                    </Col>
                    <Col className='col-4 d-flex justify-content-end'>{leg.arrival.substring(11)}</Col>
                  </Row>
                  <Row>
                    <Col><span style={{ marginRight: '10px',color: 'grey', fontSize: '30px' }}>{leg.origin.displayCode}</span>
                      <span className='ml-2' style={{ marginRight: '10px',color: 'grey', fontSize: '30px' }}>{leg.origin.name},
                      {leg.origin.country}</span>
                    </Col>
                    <Col>
                      <span className='ml-4'>{leg.stopCount} Stop</span>
                    </Col>
                    <Col className='col-4 d-flex justify-content-end'>
                      <span style={{ marginRight: '10px',color: 'grey', fontSize: '30px' }}>{leg.destination.displayCode}</span>
                      <span className='ml-2'  style={{ marginRight: '10px',color: 'grey', fontSize: '30px' }}>{leg.destination.name},
                      {leg.origin.country}</span>
                    </Col>
                  </Row>
            <br />
            
            {leg.segments.map((segment, index) => (
            <Container>
              <Row key={index}>
                <Col><span style={{ marginRight: '10px',fontSize: '25px'}}>{segment.origin.parent.displayCode}</span>
                  <span className='ml-2' style={{ marginRight: '10px' ,fontSize: '25px'}}>{segment.origin.parent.name}<br/>
                  {segment.origin.country}
                  </span>
                </Col>
                <Col>
                  <span style={{ marginRight: '10px',fontSize: '20px' }}>{Math.floor(segment.durationInMinutes / 60)} Hours</span>
                  <span className='ml-2' style={{ marginRight: '10px',fontSize: '20px' }}>{segment.durationInMinutes % 60} Minutes</span>
                </Col>
                <Col className='justify-content-end'>
                  <span style={{ marginRight: '10px' ,fontSize: '25px'}}>{segment.destination.parent.displayCode}</span>
                  <span className='ml-2' style={{ marginRight: '10px' ,fontSize: '25px'}}>{segment.destination.parent.name}<br/>
                  {segment.destination.country}</span>
                </Col>
              </Row>
              <Row className='mb-3'>
              <Col className='justify-content-end'>
                  <span style={{ marginRight: '10px' ,fontSize: '25px'}}>Operated By :{segment.operatingCarrier?.name} </span>
              </Col>
              <Col className='justify-content-end'>
                  <span style={{ marginRight: '10px' ,fontSize: '25px'}}>Flight Number :{segment.flightNumber} </span>
              </Col>
              </Row>
              </Container>
            ))}
          <hr></hr>
          </div>
        ))}
        <Row className="justify-content-center" >
          <Col style={{ fontSize: '30px', color: 'darkblue' }}>
            Price: {flight.price.formatted}
          </Col>

        </Row><hr/>
        <Row>
          <Col>
      Self Transfer: {flight.isSelfTransfer ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}<br/>
      Protected Self Transfer: {flight.isProtectedSelfTransfer ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}
       </Col>
          <Col><Row><b color='blue'>Fare Policy:</b></Row>
      <ul>
        <li>Change Allowed: {flight.farePolicy.isChangeAllowed ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}</li>
        <li>Partially Changeable: {flight.farePolicy.isPartiallyChangeable ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}</li>
        <li>Cancellation Allowed: {flight.farePolicy.isCancellationAllowed ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}</li>
        <li>artially Refundable: {flight.farePolicy.isPartiallyRefundable ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}</li>
      </ul></Col>
      
    </Row>
      </Container>
      <hr />
        <Container className="justify-content-center">
          
          <div className="text-white p-4">
            <h2>Customer Information</h2>
            <form onSubmit={handleSubmit}>
              
              <Row>
              <Col className="form-group ">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control height-80"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleChange}
                  required
                />
              </Col>
              </Row>
              <Row>
              <Col className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={customerInfo.dob}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col className="form-group">
                <label>Passport Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="passport"
                  value={customerInfo.passport}
                  onChange={handleChange}
                  required
                />
                </Col>
             </Row>
              <button type="submit" className="btn btn-primary mt-3">Continue</button>
            </form>
          </div>
        </Container>
    </div>
  );
};

export default FlightDetailPage;
