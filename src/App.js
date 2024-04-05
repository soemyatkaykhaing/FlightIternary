import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statement
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchPage from './component/SearchPage'; // Corrected import path
import FlightsPage from './component/FlightsPage'; // Corrected import path
import FlightDetail from './component/FlightDetail'; // Corrected import path
import FlightTestPage from './component/FlightTestPage';
import FlightTestPageJSon from './component/FlightTestPageJSon';

import TicketPage from './component/TicketPage';


function App() {
  
  return (
    <Router> {/* Use BrowserRouter instead of Routes */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/flight-info" element={<FlightsPage />} />
        <Route path="/flight-detail" element={<FlightDetail />} />
        <Route path="/ticket-page" element={<TicketPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
