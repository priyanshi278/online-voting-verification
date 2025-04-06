import React, { useRef, useState } from 'react';
import axios from 'axios';

const VerifyPage = () => {
  const [idImage, setIdImage] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState('');

  const videoRef = useRef(null);
  const canvasIdRef = useRef(null);
  const canvasFaceRef = useRef(null);

  // Start webcam
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
        alert("Camera access is required.");
      });
  };

  // Capture voter ID from camera
  const captureId = () => {
    const video = videoRef.current;
    const canvas = canvasIdRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        setIdImage(blob);
        alert("✅ Voter ID captured!");
      }, 'image/jpeg');
    }
  };

  // Capture face from camera
  const captureFace = () => {
    const video = videoRef.current;
    const canvas = canvasFaceRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        setFaceImage(blob);
        alert("✅ Face captured!");
      }, 'image/jpeg');
    }
  };

  const handleVerify = async () => {
    if (!idImage || !faceImage) {
      alert("Please capture both your Voter ID and your face.");
      return;
    }

    const formData = new FormData();
    formData.append('idImage', idImage);
    formData.append('faceImage', faceImage);

    try {
      setVerificationMessage("🔍 Verifying...");
      const response = await axios.post('http://127.0.0.1:5000/verify-face-id', formData);
      setVerificationMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setVerificationMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <h2>🛂 Identity Verification</h2>
      
      <video ref={videoRef} autoPlay style={styles.video}></video>
      <button onClick={startCamera} style={styles.button}>Start Camera</button>

      <div style={styles.captureSection}>
        <p>📄 Capture your Voter ID:</p>
        <button onClick={captureId} style={styles.button}>Capture Voter ID</button>
        <canvas ref={canvasIdRef} style={{ display: 'none' }}></canvas>
      </div>

      <div style={styles.captureSection}>
        <p>🤳 Capture your Face:</p>
        <button onClick={captureFace} style={styles.button}>Capture Face</button>
        <canvas ref={canvasFaceRef} style={{ display: 'none' }}></canvas>
      </div>

      <button onClick={handleVerify} style={styles.verifyButton}>Verify</button>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        {verificationMessage}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  },
  video: {
    width: '300px',
    borderRadius: '10px',
    border: '2px solid #ccc',
  },
  captureSection: {
    marginTop: '30px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  verifyButton: {
    marginTop: '30px',
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default VerifyPage;
