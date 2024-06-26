import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Brand from './components/Brand';
import SeedType from './components/SeedType';
import PackageProducts from './components/PackageProducts';
import SearchBar from './components/SearchBar';
import ProductDetails from './components/ProductDetails';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

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

  const handleLoginSuccess = (id) => {
    closePopup();
    setIsLoggedIn(true);
    setUserId(id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <Navbar openAuthPopup={openAuthPopup} isLoggedIn={isLoggedIn} userId={userId} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
          <Route path="/แบรนด์" element={<Brand />} />
          <Route path="/ประเภทเมล็ดพันธุ์" element={<SeedType />} />
          <Route path="/สินค้าตามแพ็กเกจ" element={<PackageProducts />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/product/:productId" element={<ProductDetails userId={userId} />} />
          <Route path="/seedType/:type" element={<SeedType />} />  
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-popup" onClick={closePopup}>x</button>
              {isRegistering ? <Signup toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} onSuccess={handleLoginSuccess} />}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
