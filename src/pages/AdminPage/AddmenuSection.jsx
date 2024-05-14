import React, { useState } from 'react'

const AddmenuSection = () => {

  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [price, setPrice] = useState(0)

  return (
    <>
      <div className='addmenu_main'>
        {image && <img src={image} alt='menuImage' />}
        <input type="text" id="imgUrl" name="imgUrl" placeholder='imageUrl...' value={image} />
        <input type="text" id="title" name="title" placeholder='title...' value={title} />
        <input type="number" id="rating" name="rating" placeholder='rating ...' maxLength={1} min={0} max={4} value={rating} />
        <textarea name="description" id="description" placeholder='description here ...' value={description}></textarea>
        <input type="text" id="prep" name="prep" placeholder='prep time ...' value={prepTime} />
        <input type="number" id="price" name="price" placeholder='price ...' maxLength={3} value={price} />
      </div>
    </>
  )
}

export default AddmenuSection
