import React from 'react'
import "./Ad.css"
import adbanner from '../assets/adbanner.png'
const Ad = () => {
  return (
    <div className='ad-container' >
        <img src={adbanner} alt="" />
    </div>
  )
}

export default Ad