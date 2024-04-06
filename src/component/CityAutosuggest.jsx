import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

// Define the Autosuggest component
const CityAutosuggest = ({ value, placeholder, onChange,onSelect }) => {
  const [suggestions, setSuggestions] = useState([]);

  // Define function to fetch suggestions based on user input
  const fetchSuggestions = async (inputValue) => {
    try {
      const url = `https://sky-scanner3.p.rapidapi.com/flights/auto-complete?query=${inputValue}&market=US&locale=en-US`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '91ed51a6e0msh7a31b1ca7cd5bb5p1adee1jsn05206a65005c',
          'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
  
      // Check if the data array exists in the response
      if (data && data.data && Array.isArray(data.data)) {
        // Extract city suggestions from the response data
        const cities = data.data.map(item => ({
          name: item.presentation.title,
          code: item.navigation.localizedName,
          id: item.presentation.id
        }));
  
        setSuggestions(cities);
      } else {
        console.error('Data array not found in API response:', data);
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };
  const handleSuggestionSelected = (_, { suggestion }) => {
    // Pass the selected suggestion's ID to the onSelect callback
    
      onSelect(suggestion.id,suggestion.name);
  };
  
   
  // Define function to render suggestion
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={handleSuggestionSelected}
      inputProps={{
        placeholder,
        value,
        onChange: (_, { newValue }) => onChange(newValue),
        className: "todo-input col-9"
      }}
    />
  );
};

export default CityAutosuggest;
