import React, { useState, useEffect } from 'react';

const CameraAndSpeechToText: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Access user's camera
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    getCameraStream();

    // Set up speech recognition
    const recognition = new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
     recognition.onresult = event => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setInputText(transcript);
    };

    setRecognition(recognition);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleStartRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleStopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      <div>
        {stream && <video srcObject={stream} autoPlay={true} />}
      </div>
      <div>
        <button onClick={handleStartRecognition}>Start Speech Recognition</button>
        <button onClick={handleStopRecognition}>Stop Speech Recognition</button>
      </div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={event => setInputText(event.target.value)}
          placeholder="Speech to Text"
        />
      </div>
    </div>
  );
};

export default CameraAndSpeechToText;
