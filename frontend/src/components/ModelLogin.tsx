import React, { useState } from 'react';
import '../styles/model.css';

function ModalLoginForm() {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 
   const openModal = () => {
     setIsModalOpen(true);
   };
 
   const closeModal = () => {
     setIsModalOpen(false);
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Handle form submission logic here
   };
 
   return (
     <div>
       <h2>Modal Login Form</h2>
      
       {isModalOpen ? (
         <div id="id01" className="modal">
           <form className="modal-content animate" onSubmit={handleSubmit}>
             <div className="imgcontainer">
               <span onClick={closeModal} className="close" title="Close Modal">
                 &times;
               </span>
               <img src="img_avatar2.png" alt="Avatar" className="avatar" />
             </div>
 
             <div className="container">
               <label htmlFor="uname">
                 <b>Username</b>
               </label>
               <input type="text" placeholder="Enter Username" name="uname" required />
 
               <label htmlFor="psw">
                 <b>Password</b>
               </label>
               <input type="password" placeholder="Enter Password" name="psw" required />
 
               <button type="submit">Login</button>
               <label>
                 <input type="checkbox" checked={true} name="remember" /> Remember me
               </label>
             </div>
 
             <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
               <button type="button" onClick={closeModal} className="cancelbtn">
                 Cancel
               </button>
               <span className="psw">
                 Forgot <a href="#">password?</a>
               </span>
             </div>
           </form>
         </div>
       ): <button onClick={openModal}>Login</button>}
     </div>
   );
 }
 
 export default ModalLoginForm;


 
 
 
 
 