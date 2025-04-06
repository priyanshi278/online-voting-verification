// src/IDCapture.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const IDCapture = ({ onSuccess }) => {
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const captureID = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    setScanning(true);
    try {
      const blob = await fetch(screenshot).then(res => res.blob());
      const formData = new FormData();
      formData.append('idImage', blob, 'voter_id.jpg');

      const res = await axios.post('http://localhost:5000/scan-id', formData);
      setScanResult(res.data.text);

      if (res.data.valid) {
        onSuccess(res.data.text); // Proceed to face scan
      } else {
        alert('❌ Invalid Voter ID. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong while scanning ID.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h3>📸 Capture Your Voter ID</h3>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <br />
      <button onClick={captureID} disabled={scanning} style={{ marginTop: 10 }}>
        {scanning ? 'Scanning...' : 'Scan Voter ID'}
      </button>
      {scanResult && (
        <div style={{ marginTop: 20 }}>
          <h4>📋 OCR Result:</h4>
          <pre>{scanResult}</pre>
        </div>
      )}
    </div>
  );
};

export default IDCapture;
