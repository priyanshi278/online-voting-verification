import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

const FaceMatch = () => {
  const webcamRef = useRef(null);
  const idCamRef = useRef(null);
  const [result, setResult] = useState("");

  const captureImage = async (ref) => {
    const screenshot = ref.current.getScreenshot();
    const blob = await fetch(screenshot).then(res => res.blob());
    return blob;
  };

  const handleCompare = async () => {
    const idBlob = await captureImage(idCamRef);
    const selfieBlob = await captureImage(webcamRef);

    const formData = new FormData();
    formData.append("idPhoto", idBlob, "id.jpg");
    formData.append("selfie", selfieBlob, "selfie.jpg");

    try {
      const res = await axios.post("http://localhost:5000/face-match", formData);
      setResult(res.data.result);
    } catch (error) {
      console.error(error);
      setResult("❌ Face match failed");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>🪪 Capture ID Photo</h2>
      <Webcam
        audio={false}
        ref={idCamRef}
        screenshotFormat="image/jpeg"
        width={300}
        height={300}
        videoConstraints={videoConstraints}
      />

      <h2>🤳 Capture Live Selfie</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        height={300}
        videoConstraints={videoConstraints}
      />

      <button onClick={handleCompare}>Compare Faces</button>
      <h3>Result: {result}</h3>
    </div>
  );
};

export default FaceMatch;
