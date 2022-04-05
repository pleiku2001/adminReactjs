import React from 'react'
import "./footer.scss"
function Footer() {
    const d = new Date();
    let Year = d.getFullYear()

  return (
    <div className='footer'>Create by NTK - <span>{Year}</span>  </div>
  )
}

export default Footer