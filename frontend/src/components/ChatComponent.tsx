import React, { useState, useEffect } from 'react';
import { AiOutlineAudio } from 'react-icons/ai';
import '../styles/chat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Cookies from 'js-cookie';

const ChatComponent = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [section, setSection] = useState(''); // Set the section you want to fetch questions for
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id === '1') {
      setSection('mern');
    } else if (id === '2') {
      setSection('java');
    } else {
      setSection('nodejs');
    }

    fetchRandomQuestion();
  }, [id]);

  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
  }, [listening]);
console.log(error)
  const fetchRandomQuestion = () => {
    axios.get("http://localhost:8080/api/questions/mern").then((res)=>console.log(res)).catch((err) => console.log(err));
    fetch(`http://localhost:8080/api/questions/mern`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse response text
      })
      .then((data) => {
        console.log(error,data)
        setQuestion(data);
        setError(''); // Clear any previous error
      })
      .catch((error) => {
        setError('Fetch error: ' + error.message);
      });
  };

  const submitAnswer = () => {
    fetch('http://localhost:8080/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: answer }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse response text
      })
      .then((data) => {
        setEvaluation(data);
        setAnswer('');
      })
      .catch((error) => {
        setError('Fetch error: ' + error.message);
      });
  };

  const evaluateQuestions = () => {
    fetch('http://localhost:8080/api/evaluate')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse response text
      })
      .then((data) => {

        setEvaluation(data);
      })
      .catch((error) => {
        setError('Fetch error: ' + error.message);
      });
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setTranscript('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript(event.results[i][0].transcript);
          setAnswer((prevAnswer) => prevAnswer + ' ' + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript((prevTranscript) => prevTranscript + interimTranscript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    setListening(false);
  };

  return (
    <div>
      <h2>Question:</h2>
      <p>{question}</p>
      <h2>Your Answer:</h2>
      <textarea
        rows={4}
        cols={50}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={submitAnswer}>Submit Answer</button>
      <button onClick={fetchRandomQuestion}>Next Question</button>
      <button onClick={evaluateQuestions}>Evaluate</button>
      <h2>Evaluation:</h2>
      <p>{evaluation}</p>
      <div className="speech-recognition">
        <button onClick={listening ? stopListening : startListening}>
          <AiOutlineAudio /> {/* Microphone icon */}
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
        {listening && <span>Listening...</span>}
        <span>{transcript}</span>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ChatComponent;
