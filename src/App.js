import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [isRegistering, setIsRegistering] = useState(true);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={isRegistering ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
