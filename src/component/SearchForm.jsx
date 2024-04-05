import React, { useState } from 'react';
import './SearchForm.css'; // Import custom CSS for styling
import CityAutosuggest from './CityAutosuggest'; // Import the CityAutosuggest component

const SearchForm = ({ onSearch }) => {
  const [departureId, setDepartureId] = useState('');
  const [departureName, setDepartureName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('round');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ departure: departureId, destination: destinationId, date, returnDate });
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
    <div className='col-6 todo-app'>
      <form className="mt-4 todo-form" onSubmit={handleSubmit}>
        <div className="mb-3">
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
          <div className="col-9 mt-2">
            <label>
              <input
                type="radio"
                value="one-way"
                checked={tripType === 'one-way'}
                onChange={() => setTripType('one-way')}
              />
              One Way
            </label>
            <label className="ml-3">
              <input
                type="radio"
                value="round"
                checked={tripType === 'round'}
                onChange={() => setTripType('round')}
              />
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
          className='btn btn-primary mt-3 justify-center'>
          Search Flight
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
