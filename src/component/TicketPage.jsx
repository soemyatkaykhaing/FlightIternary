import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';



const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'left',
    padding: 20,
    textAlign: 'left', 
    width: '100%',
    minHeight: '100%'
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#666',
  },
  value: {
    color: '#000',
  },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'darkblue',
    marginTop: 10,
  },
  // Row-specific styles
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
  column: {
    flexDirection: 'column', // Equal width columns
    marginRight: 5, 
    width: '25%'// Adjust spacing between columns
  },
});

const TicketPage = () => {
  // Assuming flight and customerInfo are provided from the parent component
  const location = useLocation();
  const { flight, customerInfo } = location.state || {};

  // Function to generate PDF document
  const TicketDocument = (
    <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Flight Itinerary</Text>
      <View style={styles.price}>
        <Text>Passenger Information</Text>
        <View style={styles.section}>
          <Text>NAME: {customerInfo.name}</Text>
          <Text>EMAIL: {customerInfo.email}</Text>
        </View>
        <View style={styles.section}>
          <Text>BIRTHDATE: {customerInfo.dob}</Text>
          <Text>PASSPORT: {customerInfo.passport}</Text>
        </View>
      </View>
      {flight.legs.map((leg, legIndex) => (
        <View key={legIndex} style={styles.section}>
          <Text style={styles.label}>{legIndex === 0 ? 'Departure' : 'Return'}</Text>
          <View style={[styles.row, styles.section]}>
            <View style={styles.column}>
              <Text>Date:</Text>
              <Text>{leg.departure.substring(0, 10)}</Text>
            </View>
            <View style={styles.column}>
              <Text>Departure Time:</Text>
              <Text>{leg.departure.substring(11)}</Text>
            </View>
            <View style={styles.column}>
              <Text>Duration:</Text>
              <Text>{Math.floor(leg.durationInMinutes / 60)} Hours {leg.durationInMinutes % 60} Minutes</Text>
            </View>
            <View style={styles.column}>
              <Text>Arrival Time:</Text>
              <Text>{leg.arrival.substring(11)}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.section]}>
            <View style={styles.column}>
              <Text>From:</Text>
              <Text>{leg.origin.displayCode} {leg.origin.name}</Text>
            </View>
            <View style={styles.column}>
              <Text>Stops:</Text>
              <Text>{leg.stopCount}</Text>
            </View>
            <View style={styles.column}>
              <Text>To:</Text>
              <Text>{leg.destination.displayCode} {leg.destination.name}</Text>
            </View>
          </View>
          {/* Segment information */}
          {leg.segments.map((segment, segmentIndex) => (
            <View key={segmentIndex} style={styles.section}>
              <Text>Segment {segmentIndex + 1}</Text>
              <View style={[styles.row, styles.section]}>
                <View style={styles.column}>
                  <Text>From:</Text>
                  <Text>{segment.origin.parent.displayCode} {segment.origin.parent.name}</Text>
                </View>
                <View style={styles.column}>
                  <Text>Duration:</Text>
                  <Text>{Math.floor(segment.durationInMinutes / 60)} Hours {segment.durationInMinutes % 60} Minutes</Text>
                </View>
                <View style={styles.column}>
                  <Text>To:</Text>
                  <Text>{segment.destination.parent.displayCode} {segment.destination.parent.name}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.section]}>
                <View style={styles.column}>
                  <Text>Operated By:</Text>
                  <Text>{segment.operatingCarrier?.name}</Text>
                </View>
                <View style={styles.column}>
                  <Text>Flight Number:</Text>
                  <Text>{segment.flightNumber}</Text>
                </View>
              </View>
            </View>
          ))}
          {/* End of Segment information */}
        </View>
      ))}
      <View style={styles.line} />
      <Text style={styles.price}>Price: {flight.price.formatted}</Text>
      <View style={styles.section}>
        <Text>Fare Policy</Text>
        <View style={styles.section}>
          <Text>Change Allowed: {flight.farePolicy.isChangeAllowed ? 'Yes' : 'No'}</Text>
          <Text>Partially Changeable: {flight.farePolicy.isPartiallyChangeable ? 'Yes' : 'No'}</Text>
          <Text>Cancellation Allowed: {flight.farePolicy.isCancellationAllowed ? 'Yes' : 'No'}</Text>
          <Text>Partially Refundable: {flight.farePolicy.isPartiallyRefundable ? 'Yes' : 'No'}</Text>
        </View>
      </View>
      
      
    </Page>
  </Document>
);



  return (
    <div className="container mt-4">
      <h1>Flight Detail</h1>
      <Container className="bg-white justify-content-center text-align-center rounded" style={{ fontSize: '30px'}}>
        {flight.legs.map((leg, legIndex) => (
          <div key={legIndex}>
            <br></br>
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
            {leg.segments.map((segment, index) => (
              <Container key={index}>
                <Row>
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
                    <span style={{ marginRight: '10px' ,fontSize: '25px'}}>Operated By: {segment.operatingCarrier?.name} </span>
                  </Col>
                  <Col className='justify-content-end'>
                    <span style={{ marginRight: '10px' ,fontSize: '25px'}}>Flight Number: {segment.flightNumber} </span>
                  </Col>
                </Row>
              </Container>
            ))}
            <hr></hr>
          </div>
        ))}
        <br/> 
        <hr />
        <Row className="justify-content-center" >
          <Col style={{ fontSize: '30px', color: 'darkblue' }}>
            Price: {flight.price.formatted}
          </Col>
        </Row>
        <hr/>
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
          <Col>
            <Row><b color='blue'>Fare Policy:</b></Row>
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
              <li>Partially Refundable: {flight.farePolicy.isPartiallyRefundable ? (
                <span style={{ color: 'green' }}>Yes</span>
              ) : (
                <span style={{ color: 'red' }}>No</span>
              )}</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <div >
        <b style={{fontSize: '30px', color: 'darkblue'}}>Passenger Information</b>
        <br/>
        <Row className='mb-2 mt-2'>
          <Col>NAME: {customerInfo.name}</Col>
          <Col>EMAIL: {customerInfo.email}</Col>
        </Row>
        <Row className='mb-2'>
          <Col>BIRTHDATE: {customerInfo.dob}</Col>
          <Col>PASSPORT: {customerInfo.passport}</Col>
        </Row>
      </div>
      <Container className='container mb-5 mt-5'>
        {/* Button to download ticket information as PDF */}
        <PDFDownloadLink document={TicketDocument} fileName="ticket.pdf" className='btn btn-primary'>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download Ticket PDF'
          }
        </PDFDownloadLink>
      </Container>
    </div>
  );
};

export default TicketPage;
