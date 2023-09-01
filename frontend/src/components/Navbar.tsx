import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginFailure, LoginSuccess } from '../Redux/Authentication/action';
import logo from "./logo2.png"
const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const isAuth = useSelector((state:any) => state.AuthReducer.isAuth);
  const dispatch = useDispatch();

  const handleLogin = () => {
   
    dispatch(LoginSuccess());
  };

  return (
    <nav className="navigation">
      <Link to="/" >
       <img src={logo} className="brand-name" alt="mock-it-to-crack-it" />
      </Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* Your hamburger icon */}
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          <li>
          <Link to="/dashboard">
            <button>
            Home
            </button>
            </Link>
          </li>
          <li>
          <Link to="/dashboard">
            <button>
             About
            </button>
           </Link>
          </li>
          <li>
            {!isAuth ? (
              <button onClick={handleLogin}>Login</button>
            ) : (
              <button>Welcome, User!</button>
            )}
          </li>
          <li>
            {!isAuth ? (
              <button onClick={handleLogin}>Mock It - Crack It</button>
            ) : (
             
                <button  onClick={()=>{dispatch(LoginFailure())}}
                >logout</button>
             
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
