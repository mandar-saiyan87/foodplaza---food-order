import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { useSelector, useDispatch } from 'react-redux'
import { addtocart, removefromcart } from '../store/cartSlice.js'
import Alerts from './Alerts.jsx'
import { Link } from 'react-router-dom'

function Dishdcard({ item }) {

  const [qty, setQty] = useState(0)
  const [showWarning, setWarning] = useState(false)

  const cartItems = useSelector((state) => state.cart.cartItems)
  const token = useSelector((state) => state.user.token)
  const isDbUser = useSelector((state) => state.user.dbUser)
  const dispatch = useDispatch()

  const currentmenu = cartItems.find(menu => menu.menuItem._id === item._id)

  useEffect(() => {
    if (currentmenu) {
      setQty(currentmenu.qty)
    }
  }, [currentmenu])


  function addQty(e) {
    e.stopPropagation()
    if (!token && !isDbUser) {
      setWarning(true)
      setTimeout(() => {
        setWarning(false)
      }, 2000);
    } else {
      setQty(prevState => prevState + 1)
      dispatch(addtocart({ 'menuItem': item, 'qty': 1 }))
    }

  }

  function reduceqty(e) {
    e.stopPropagation()
    if (qty !== 0) {
      setQty(prevState => prevState - 1)
      dispatch(removefromcart({ 'menuItem': item, 'qty': -1 }))
    }
  }


  return (
    <>
      {showWarning && <Alerts message="Please login to add to cart" status="Warning" />}

      <div className='dcard'>
        <div className='dcard_image'>
          <div className='prodoverlay'>
            <img src={item.image} alt={item.title} className='prodimg' />
          </div>
          <div className='addqty'>
            {qty > 0 ? <div className='manageqty'>
              <img src={assets.remove_icon_red} alt="removeqty" className='dcard_ico' onClick={reduceqty} />
              <p>{qty}</p>
              <img src={assets.add_icon_green} alt="addqty" className='dcard_ico' onClick={addQty} />
            </div> : <img src={assets.add_icon_white} alt="addicon" className='dcard_ico' onClick={addQty} />}
          </div>
        </div>
        <Link to={`/menu/${item._id}`}>
          <div className="dcard_details">
            <div className='dcard_heading'>
              <p className='dcard_title'>{item.title}</p>
              <div className='rating'>
                {item.ratings ? [...Array(item.ratings)].map((_, index) => (
                  <img src={assets.star_yellow} alt="rating" key={index} />
                )) : [...Array(4)].map((_, index) => (
                  <img src={assets.star_black} alt="rating" key={index} />
                ))}
              </div>

            </div>
            <p className='dcard_description'>{item.description}</p>
            <p className='dcard_price'>${item.price}</p>
          </div>
        </Link >
      </div>
    </>
  )
}

export default Dishdcard