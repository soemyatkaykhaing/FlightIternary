import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../component/SearchForm';
import { useNavigate } from 'react-router-dom';


const SearchPage = () => {
  const navigate = useNavigate();
  const handleSearch = async ({ departure, destination, date, returnDate }) => {
    try {
      const fromId = departure; // ID of the departure city
      const toId = destination; // ID of the destination city
      const departDate = date; // Departure date
      // Return date will be provided as a parameter

      const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip?fromId=${fromId}&toId=${toId}&departDate=${departDate}&returnDate=${returnDate}&adults=1&currency=USD&market=US&locale=en-US`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '91ed51a6e0msh7a31b1ca7cd5bb5p1adee1jsn05206a65005c',
          'X-RapidAPI-Host': 'skyscanner80.p.rapidapi.com'
        }
      };
      console.log(url);
      const response = await fetch(url, options);
      const data = await response.text();
      console.log(data);
      navigate('/flight-info', { state: { data } });

    } catch (error) {
      console.error(error);
    }
  };

  // Redirect to '/flight-info' if redirect state is true
  
  return (
    <div className="container search-page">
      <h1 className='text-center'>Flight Search</h1>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;
