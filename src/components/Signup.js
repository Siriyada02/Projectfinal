import React, { useState } from 'react';
import './Signup.css';

function Signup({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบว่ารหัสผ่านตรงกัน
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        // เช็คว่าลงทะเบียนสำเร็จแล้วและเรียกใช้ toggleForm เพื่อเปลี่ยนเส้นทางไปยังหน้า login
        if (data.redirect === '/login') {
          toggleForm(); // เรียกใช้ฟังก์ชันที่เปลี่ยนเส้นทางหน้า
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign up</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign up</button>
        <p>Already have an account? <button type="button" onClick={toggleForm}>Log in</button></p>
      </form>
    </div>
  );
}

export default Signup;
