import React from 'react'

function ContactCard({ name, post, email }) {
  return (
    <>
      <div className='conatct_card'>
        <p className='name_title'>{name}</p>
        <p>{post}</p>
        <p>Email: <span>{email}</span></p>
      </div>
    </>
  )
}

export default ContactCard
