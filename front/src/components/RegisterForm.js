import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can perform form submission logic here
  };

  return (
    <div className="register-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder=" Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={formData.confirmpassword}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <div style={styles.linksContainer}>
          <Link to="/login" style={{ textDecoration: 'none' }}>Already a member? Log in</Link>
          </div>
      </form>
    </div>
  );
};

const styles ={ 
    linksContainer: {
        display: 'flex',
        marginRight:'210px',
        marginTop: '10px',
      },
      link: {
        marginRight: '10px',
        color: '#065fd4',
        textDecoration: 'none',
        cursor: 'pointer',
      }
}

export default RegisterForm;
