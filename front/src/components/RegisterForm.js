import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Sign-in successful
        const data = await response.json();
        console.log(data.message); // or perform further actions
      } else {
        // Sign-in failed
        const errorData = await response.json();
        console.log(errorData.message); // or display an error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {<h1>Log <span>in</span></h1>}
        <br></br>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <br />
          <div style={styles.passwordOptionsContainer}>
            <a href="/forgot-password" style={styles.forgotPasswordLink}>
              Forgot your password?
            </a>
          </div>
          <br />
          <button type="submit" style={styles.button}>Sign In</button>
          <div style={styles.linksContainer}>
          <Link to="/registerhere" style={{ textDecoration: 'none' }}>Not a member? Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
  },
  box: {
    width: '500px',
    height: '500px',
    padding: '20px',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'left'
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  passwordOptionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight:'280px',
    //marginTop: '5px',
    //display: 'flex',
    //justifyContent: 'left',
    //alignItems: 'center'
  },
  forgotPasswordLink: {
    color: '#065fd4',
    textDecoration: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    marginRight:'10px'
    
  },
  button: {
    padding: '10px',
    backgroundColor: 'lightskyblue',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
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
  },
};


export default LoginForm;
