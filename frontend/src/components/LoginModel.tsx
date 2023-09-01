import React, { useState } from 'react';
import '../styles/model.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (e: React.FormEvent) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can add your authentication logic here.
    // For simplicity, let's assume authentication is successful for any input.

    // Close the modal
    onClose();

    // Call the onLogin callback (you can implement this function in your parent component)
    onLogin(e);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content animate">
        <span onClick={onClose} className="close" title="Close Modal">
          &times;
        </span>

        <form onSubmit={handleSubmit}>
          <div className="imgcontainer">
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>

          <div className="container">
            <label htmlFor="uname"><b>Username</b></label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="psw"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
            <label>
              <input type="checkbox" defaultChecked name="remember" /> Remember me
            </label>
          </div>

          <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
            <button type="button" onClick={onClose} className="cancelbtn">
              Cancel
            </button>
            <span className="psw">Forgot <a href="#">password?</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
