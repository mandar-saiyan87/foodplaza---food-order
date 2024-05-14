import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCategories, addNew, deleteCat } from '../../store/categorySlice'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategorySection = () => {

  const dispatch = useDispatch()

  const catagories = useSelector((state) => state.categories.categories)

  // console.log(catagories)

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

  function deleteCategory(id) {
    dispatch(deleteCat(id))
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
              <div className='admin_cat_card' key={cat._id}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="close_img" onClick={() => deleteCategory(cat._id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className='admin_card_content'>
                  <div className='admin_catcard_title'>
                    <div style={{ backgroundImage: `url(${cat.cat_img})` }} className='catcard_title'>
                    </div>
                    {cat.category}
                  </div>
                  <p></p>
                </div>
              </div>
            ))
          }
        </div>
      </div >
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