import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getallmenu, deletemenu, editMenu } from '../../store/menuSlice'
import { assets } from '../../assets/assets'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MenuItemSection = () => {

  const categoryOptions = useSelector((state) => state.categories.categories)
  const allMenu = useSelector((state) => state.menu.menus)

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);

  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [menuId, setMenuId] = useState('')

  function handleClose() {
    setShow(false);
  }

  function handleShow(id) {
    const editmenu = allMenu.find((menu) => menu._id === id)
    // console.log(editmenu)
    setImage(editmenu.image)
    setTitle(editmenu.title)
    setRating(editmenu.ratings)
    setDescription(editmenu.description)
    setPrepTime(editmenu.prepTime)
    setPrice(editmenu.price)
    setCategory(editmenu.category)
    setMenuId(editmenu._id)
    setShow(true);
  }


  useEffect(() => {
    dispatch(getallmenu())
  }, [dispatch])

  function deletemenuItem(id) {
    dispatch(deletemenu(id))
  }

  function editMenuItem(id) {
    dispatch(editMenu({
      image, title, rating, description, prepTime, price, category, id
    }))
    handleClose()
  }

  return (
    <>
      <div className='menuitems_main'>
        {allMenu.length > 0 ?
          <>
            {
              allMenu.map((item) => (
                <div className="menuitem_card" key={item._id}>
                  <div className='menuitem_title'>
                    <img src={item.image} alt={item.title} />
                    <p>{item.title}</p>
                  </div>
                  <p>${item.price}</p>
                  <div className='rating'>
                    {item.ratings ? [...Array(item.ratings)].map((_, index) => (
                      <img src={assets.star_yellow} alt="rating" key={index} />
                    )) : [...Array(4)].map((_, index) => (
                      <img src={assets.star_black} alt="rating" key={index} />
                    ))}
                  </div>
                  <div className='ico_div'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="delete_ico" onClick={() => deletemenuItem(item._id)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit_ico" onClick={() => handleShow(item._id)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </div>
                </div>
              ))}
          </>
          :
          <div>No menu item added</div>
        }
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu: {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editmenu_main'>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='close_button' onClick={handleClose}>
            Close
          </Button>
          <Button className='sign_in' onClick={() => editMenuItem(menuId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MenuItemSection