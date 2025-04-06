
// src/Verification.js
import React, { useRef, useState } from 'react';

const Verification = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    const image = canvas.toDataURL('image/png');
    setCapturedImage(image);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Live ID & Face Verification</h2>
      <video ref={videoRef} autoPlay style={{ width: '60%', marginBottom: '10px' }} />
      <br />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage} style={{ marginLeft: '10px' }}>Capture Image</button>

      {capturedImage && (
        <div>
          <h4>Captured Image:</h4>
          <img src={capturedImage} alt="Captured" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default Verification;
