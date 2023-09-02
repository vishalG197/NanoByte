import React from 'react';
import '../styles/banner.css';
import banner from './banner.jpg';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <div className="banner-container">
      <div className="image-side">
        {/* Replace 'image.jpg' with your image */}
        <img src={banner} alt="Banner Image" />
      </div>
      <div className="content-side">
      <h1>Master Your Interviews</h1>
  <p>Ace Every Interview with Confidence and Preparation</p>
       <button className="action-button">Mock It, Crack It</button>
      </div>
    </div>
  );
}

export default Banner;
