import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 480,
  height: 360,
  facingMode: "user",
};

const Verify = () => {
  const webcamRef = useRef(null);
  const [idImage, setIdImage] = useState(null);
  const [faceImage, setFaceImage] = useState(null);
  const [message, setMessage] = useState('');

  const captureImage = (type) => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (type === "id") {
      setIdImage(imageSrc);
    } else {
      setFaceImage(imageSrc);
    }
  };

  const handleSubmit = async () => {
    if (!idImage || !faceImage) {
      alert("Please capture both ID and face images.");
      return;
    }

    const formData = new FormData();
    formData.append("idImage", dataURLtoBlob(idImage), "id.jpg");
    formData.append("faceImage", dataURLtoBlob(faceImage), "face.jpg");

    try {
      const res = await axios.post("http://localhost:5000/verify-face-id", formData);
      setMessage(res.data.message || "Verification completed");
    } catch (error) {
      setMessage("Verification failed ❌");
      console.error(error);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Live Verification</h2>
      <Webcam
        audio={false}
        height={360}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={480}
        videoConstraints={videoConstraints}
      />
      <div style={{ margin: '10px' }}>
        <button onClick={() => captureImage("id")}>Capture ID</button>
        <button onClick={() => captureImage("face")}>Capture Face</button>
      </div>
      <div>
        {idImage && (
          <div>
            <h4>ID Image</h4>
            <img src={idImage} alt="ID Preview" style={{ width: '200px' }} />
          </div>
        )}
        {faceImage && (
          <div>
            <h4>Face Image</h4>
            <img src={faceImage} alt="Face Preview" style={{ width: '200px' }} />
          </div>
        )}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Submit for Verification
      </button>
      <h3 style={{ marginTop: '20px', color: 'green' }}>{message}</h3>
    </div>
  );
};

export default Verify;
