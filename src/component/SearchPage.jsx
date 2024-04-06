import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../component/SearchForm';
import { useNavigate } from 'react-router-dom';


const SearchPage = () => {
  const navigate = useNavigate();

 const handleSearch = async ( {departure, destination, date, returnDate }) => {
  try {
    const fromId = departure; // ID of the departure city
    const toId = destination; // ID of the destination city
    const departDate = date; // Departure date

    let url;

    // Check if returnDate is provided
    if (returnDate) {
      // If returnDate is provided, construct URL for roundtrip search
      url = `https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip?fromEntityId=${fromId}&toEntityId=${toId}&departDate=${departDate}&returnDate=${returnDate}&adults=1&currency=USD&market=US&locale=en-US`;
    } else {
      // If returnDate is not provided, construct URL for one-way search
      url = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${fromId}&toEntityId=${toId}&departDate=${departDate}&adults=1&currency=USD&market=US&locale=en-US`;
    }
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '91ed51a6e0msh7a31b1ca7cd5bb5p1adee1jsn05206a65005c',
          'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
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
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;
