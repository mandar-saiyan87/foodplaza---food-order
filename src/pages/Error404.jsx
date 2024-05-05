import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div className='error404'>
      <p>You seems to be lost</p>
      <Link to="/"><p class="back"><span>←</span>Back to Home</p></Link>
    </div>
  )
}

export default Error404
