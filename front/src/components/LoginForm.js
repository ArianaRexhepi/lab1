import React, { useState } from 'react';

const LoginForm = () => {
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
        <h1>Log <span>in</span></h1>
        <br></br>
        <form onSubmit={handleSubmit} style={styles.form}>
          <p>Enter your username </p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <br />
          <p>Enter your password </p>
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
        </form>
        <div style={styles.linksContainer}>
          <a href="/register" style={styles.link}>
           Not a member? Register here
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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
    justifyContent: 'left',
    //alignItems: 'center'
  },
  forgotPasswordLink: {
    color: 'grey',
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
    justifyContent: 'left',
    marginTop: '10px',
  },
  link: {
    marginRight: '10px',
    color: '#065fd4',
    //textDecoration: 'underline',
    cursor: 'pointer',
  },
  p: {
    textAlign: 'left',
    marginRight:'10px'
  }
};


export default LoginForm;
