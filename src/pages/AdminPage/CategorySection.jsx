import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCategories, addNew } from '../../store/categorySlice'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategorySection = () => {

  const dispatch = useDispatch()

  const catagories = useSelector((state) => state.categories.categories)

  const [imgUrl, setImgurl] = useState('')
  const [title, settitle] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function submitCategory() {
    dispatch(addNew({ imgUrl, title }))
    setImgurl('')
    settitle('')
    handleClose()
  }


  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <>
      <div className='categories_main'>
        <button className='sign_in' onClick={handleShow}>Add Category</button>
        <div className='category_div'>
          {
            catagories.map((cat) => (
              <div className='admin_cat_card'>
                <div key={cat._id} className='admin_catcard_title'>
                  <img src={cat.cat_img} alt="category_image" />
                  {cat.category}
                </div>
                <p></p>
              </div>
            ))
          }
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='input_wrapper'>
            <input type="text" name="url" id="url" value={imgUrl} onChange={(e) => setImgurl(e.target.value)} placeholder='img url...' />

            <input type="text" name="catname" id="catname" value={title} onChange={(e) => settitle(e.target.value)} placeholder='category title...' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='close_button' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='sign_in' onClick={submitCategory}>
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CategorySection