import React from 'react'
import "../styles/dashboard.css"
import { Link } from 'react-router-dom';
const Dashboard = () => {
  
   return (
      <div className="dashboard-container">
        <header className="header">Online Mock Interview Dashboard</header>
        <div className="content">
        <div className="interview-content">
        <div className="interview-card mern-card">
       
      <h2>MERN Stack Interview</h2>
      <p>Here are some topics you can expect in a MERN Stack interview:</p>
      <ul>
        <li>MongoDB</li>
        <li>Express.js</li>
        <li>React</li>
        <li>Node.js</li>
      </ul> <Link to="/interview/1" ><button>Start practice</button>
      </Link>
      </div>
      <div className="interview-card java-card">
     
      <h2>Java Interview</h2>
      <p>Here are some topics you can expect in a Java interview:</p>
      <ul>
        <li>Java basics</li>
        <li>Core Java Concepts</li>
        <li>Object-Oriented Programming</li>
        <li>Data Structures and Algorithms</li>
      </ul> <Link to="/interview/2" > <button>Start Practice</button>
      </Link>
      </div>
    
      <div className="interview-card node-card">
      
      <h2>Node.js Backend Interview</h2>
      <p>Here are some topics you can expect in a Node.js backend interview:</p>
      <ul>
        <li>Node.js Fundamentals</li>
        <li>Asynchronous Programming</li>
        <li>RESTful API Design</li>
        <li>Middleware Concepts</li>
       
      </ul>
      <Link to="/interview/3" ><button>Start Practice</button>
    </Link>
      </div>
    </div>
    </div>
    </div>
  );
       
  
}

export default Dashboard
