import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

const OCRScan = () => {
  const webcamRef = useRef(null);
  const [ocrText, setOcrText] = useState("");

  const captureAndScan = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    const blob = await fetch(screenshot).then(res => res.blob());

    const formData = new FormData();
    formData.append("idImage", blob, "live_id.jpg");

    try {
      const res = await axios.post("http://localhost:5000/scan-id", formData);
      setOcrText(res.data.text || "❌ No text detected");
    } catch (err) {
      console.error(err);
      setOcrText("❌ OCR Failed");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>📸 Live ID Capture</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        height={300}
        videoConstraints={videoConstraints}
      />
      <button onClick={captureAndScan}>Scan ID</button>
      <h3>📄 OCR Result:</h3>
      <pre>{ocrText}</pre>
    </div>
  );
};

export default OCRScan;
