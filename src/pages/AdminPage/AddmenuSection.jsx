import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addmenuitem } from '../../store/menuSlice'

const AddmenuSection = () => {

  const categoryOptions = useSelector((state) => state.categories.categories)

  const dispatch = useDispatch()

  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')


  function addMenu() {
    dispatch(addmenuitem(
      {
        title: title,
        ratings: parseInt(rating),
        image: image,
        price: parseInt(price),
        prepTime: prepTime,
        description: description,
        category: category
      }
    )
    )
    setTitle("")
    setRating(0)
    setImage("")
    setPrice(0)
    setPrepTime("")
    setDescription("")
    setCategory("")
  }

  return (
    <>
      <div className='addmenu_main'>
        {image && <img src={image} alt='menuImage' className='new_menu_img' />}
        <input type="text" id="imgUrl" name="imgUrl" placeholder='imageUrl...' value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" id="title" name="title" placeholder='title...' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" id="rating" name="rating" placeholder='rating ...' maxLength={1} min={0} max={4} value={rating} onChange={(e) => setRating(e.target.value)} />
        <textarea name="description" id="description" placeholder='description here ...' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="text" id="prep" name="prep" placeholder='prep time ...' value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
        <input type="number" id="price" name="price" placeholder='price ...' maxLength={3} value={price} onChange={(e) => setPrice(e.target.value)} />
        <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          {categoryOptions.map((category) => (
            <option key={category._id} value={category._id}>{category.category}</option>
          ))}
        </select>
        <button className='sign_in button_custom' onClick={addMenu}>Add Menu</button>
      </div>
    </>
  )
}

export default AddmenuSection
