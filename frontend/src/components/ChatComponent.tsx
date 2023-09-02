import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineAudio } from 'react-icons/ai';
import "../styles/chat.css"
import { useParams } from 'react-router-dom';
const ChatComponent = () => {
  const {id}=useParams();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [section, setSection] = useState(''); // Set the section you want to fetch questions for
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Fetch a random question when the component mounts
    if(id=="1"){
      setSection("mern")
    }else if(id=="2"){
      setSection("java")
    }else {
      setSection("nodejs");
    }
    fetchRandomQuestion();
  }, [section]);

  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
  }, [listening]);

  const fetchRandomQuestion = () => {
    axios
      .get(`/questions/${section}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitAnswer = () => {
    axios
      .post('/answer', answer)
      .then((response) => {
        setEvaluation(response.data);
        setAnswer('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const evaluateQuestions = () => {
    axios
      .get('/evaluate')
      .then((response) => {
        setEvaluation(response.data);
      })
      .catch((error) => {
        console.error(error);
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
          // Automatically add the recognized text to the answer input field
          setAnswer((prevAnswer) => prevAnswer + ' ' + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(transcript + interimTranscript);
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
    </div>
  );
};

export default ChatComponent;
