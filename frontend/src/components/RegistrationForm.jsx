import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ companyName: '', email: '', password: '', mobile: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
