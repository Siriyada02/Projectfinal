import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Brand from './components/Brand';
import SeedType from './components/SeedType';
import PackageProducts from './components/PackageProducts';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openAuthPopup = () => {
    setShowPopup(true);
    setIsRegistering(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Router>
      <div className="App">
        <Navbar openAuthPopup={openAuthPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/แบรนด์" element={<Brand />} />
          <Route path="/ประเภทเมล็ดพันธุ์" element={<SeedType />} />
          <Route path="/สินค้าตามแพ็กเกจ" element={<PackageProducts />} />
        </Routes>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-popup" onClick={closePopup}>x</button>
              {isRegistering ? <Signup toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} />}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
