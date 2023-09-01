import React from 'react';
import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/AllRoutes';
import Navbar from './components/Navbar';
// import CameraAndSpeechToText from './components/Speech_Text';
import ModalLoginForm from "./components/ModelLogin"
function App() {
  return (
    <div className="App">
  
      <Navbar/> 
     <AllRoutes/>
    </div>
  );
}

export default App;
