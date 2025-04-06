// src/Login.js
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ Login Successful');
      navigate('/verify'); // 🔁 Redirect to /verify after login
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
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
      <button onClick={handleLogin} disabled={loading} style={styles.button}>
        {loading ? 'Please wait...' : 'Login'}
      </button>
      <p style={{ marginTop: '20px' }}>
        Don’t have an account?{' '}
        <span
          onClick={() => navigate('/register')}
          style={styles.toggleLink}
        >
          Register
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

export default Login;
