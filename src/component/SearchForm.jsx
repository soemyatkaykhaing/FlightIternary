import React, { useState,useEffect} from 'react';
import './SearchForm.css'; // Import custom CSS for styling
import CityAutosuggest from './CityAutosuggest'; // Import the CityAutosuggest component
import { Row,Col,Image } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';

const SearchForm = ({ onSearch }) => {
  const [departureId, setDepartureId] = useState('');
  const [departureName, setDepartureName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('round');
  const images = [image1,image2,image3,image4]
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = { departure: departureId, destination: destinationId, date };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    document.body.style.backgroundImage = `url('${images[currentIndex]}')`;
    document.body.style.backgroundSize = 'cover'; // Ensures the image covers the entire background
    document.body.style.backgroundRepeat = 'no-repeat'; // Prevents the image from repeating
    document.body.style.backgroundPosition = 'center'; // Centers the image horizontally and vertically
  }, [currentIndex, images]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = { departure: departureId, destination: destinationId, date };

  // If tripType is 'round', include returnDate in the search parameters
  if (tripType === 'round') {
    searchParams.returnDate = returnDate;
  }

  // Call onSearch function with the appropriate parameters
    onSearch(searchParams);
  };

  // SearchForm component
  const handleCitySelect = (id, name, isDeparture) => {
    console.log('Selected city ID:', id);
    if (isDeparture) {
      setDepartureId(id);
      setDepartureName(name);
    } else {
      setDestinationId(id);
      setDestinationName(name);
    }
  };

  return (
    <Row>
    <Col className='col-5 d-flex justify-content-start'>
      <form className="mt-4  justify-content-end text-center" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <CityAutosuggest
            value={departureName}
            placeholder="Departure City"
            onChange={setDepartureName}
            onSelect={(id, name) => handleCitySelect(id, name, true)} // Pass the onSelect function
            required
          />
        </div>
        <div className="mb-3">
          <CityAutosuggest
            value={destinationName}
            placeholder="Destination City"
            onChange={setDestinationName}
            onSelect={(id, name) => handleCitySelect(id, name, false)} // Pass the onSelect function
            required
          />
        </div>
        <div className="mb-3">
          <label className="col-9 mt-4">Trip Type:</label>
          <div className="mt-2">
            
            <input
                type="radio"
                id="ow"
                name='oneway'
                value="one-way"
                checked={tripType === 'one-way'}
                onChange={() => setTripType('one-way')}
              />
              <label for='ow' className="mr-3 col-4">
             
             One Way
           </label>
           
            
            <input
                type="radio"
                id="rt"
                name='round'
                value="round"
                checked={tripType === 'round'}
                onChange={() => setTripType('round')}
              />
              <label  for='rt' className="ml-3 col-4">
              
              Round Trip
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="departDate" className="col-9 mt-4">Depart Date</label>
          <input
            id="departDate"
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name='departDate'
            className='todo-input col-9 mt-2'
          />
        </div>
        {tripType === 'round' && (
          <div className="mb-3">
            <label htmlFor="returnDate" className="col-9 mt-4">Return Date</label>
            <input
              id="returnDate"
              type='date'
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              name='returnDate'
              className='todo-input col-9 mt-2'
            />
          </div>
        )}
        <button
          type='submit'
          className='btn btn-primary mt-3 justify-center bg-maroon'>
          Search Flight
        </button>
      </form>
    </Col>
    <Col className='col-7'>
      <h1 className='title'>Get Your own Flight Itinery</h1>
      <hr style={{opacity: 0.25}}/>      
      <h1 className='title1'>All around the world</h1>
    </Col>
    </Row>
  );
};

export default SearchForm;
