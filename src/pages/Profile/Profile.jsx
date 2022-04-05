import React from 'react'
import "./profile.scss"
import {db} from "../../firebase"
import {  updatePassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../../firebase";
import {AuthContext} from "../../context/AuthContext"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function Proflie() {
  const [pass,setPass]= useState()
  const navigate = useNavigate()
  const { currentUser,dispatch1 } = useContext(AuthContext);
  const user = auth.currentUser;
  const handleClick=(e)=>{
    e.preventDefault();
    console.log(pass)
    updatePassword(currentUser, pass).then(() => {
      // Update successful.
      console.log("success")
      dispatch1({ type: "LOGOUT" })

    }).catch((error) => {
      console.log(error)
      // An error ocurred
      alert("You need to sign in again to change password")
      dispatch1({ type: "LOGOUT" })
      navigate("/login")
      // ...
    });

  } 
  console.log(currentUser)
  console.log(user)
  return (

    <div className='profile'>
      <h2>Change Password</h2>
      <input type="password" placeholder='Enter your new password' onChange={(e)=>{setPass(e.target.value)}}/>
      <button onClick={handleClick}>Change Password</button>
    </div>
  )
}

export default Proflie