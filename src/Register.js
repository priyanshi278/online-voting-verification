// src/Register.js
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('✅ Registration Successful');
      navigate('/');
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleRegister} disabled={loading} style={styles.button}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p style={{ marginTop: '20px' }}>
        Already have an account?{' '}
        <span
          onClick={() => navigate('/')}
          style={styles.toggleLink}
        >
          Login
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '100px',
    textAlign: 'center',
    padding: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px',
    width: '250px',
  },
  button: {
    padding: '10px 30px',
    cursor: 'pointer',
  },
  toggleLink: {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Register;
