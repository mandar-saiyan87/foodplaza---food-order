import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets.js'
import { useSelector, useDispatch } from 'react-redux'
import { addtocart, removefromcart } from '../store/cartSlice.js'

function Dishdcard({ item }) {

  const [qty, setQty] = useState(0)

  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()

  const currentmenu = cartItems.find(menu => menu.menuItem._id === item._id)

  useEffect(() => {
    if (currentmenu) {
      setQty(currentmenu.qty)
    }
  }, [currentmenu])


  function addQty() {
    setQty(prevState => prevState + 1)
    dispatch(addtocart({ 'menuItem': item, 'qty': 1 }))
  }

  function reduceqty() {
    if (qty !== 0) {
      setQty(prevState => prevState - 1)
      dispatch(removefromcart({ 'menuItem': item, 'qty': -1 }))
    }
  }


  return (
    <>
      <div className='dcard'>
        <div className='dcard_image'>
          <div className='prodoverlay'>
            <img src={item.image} alt={item.name} className='prodimg' />
          </div>
          <div className='addqty'>
            {qty > 0 ? <div className='manageqty'>
              <img src={assets.remove_icon_red} alt="removeqty" className='dcard_ico' onClick={reduceqty} />
              <p>{qty}</p>
              <img src={assets.add_icon_green} alt="addqty" className='dcard_ico' onClick={addQty} />
            </div> : <img src={assets.add_icon_white} alt="addicon" className='dcard_ico' onClick={addQty} />}
          </div>
        </div>
        <div className="dcard_details">
          <div className='dcard_heading'>
            <p className='dcard_title'>{item.name}</p>
            <div className='rating'>
              {item.rating ? [...Array(item.rating)].map((_, index) => (
                <img src={assets.star_yellow} alt="rating" key={index} />
              )) : [...Array(4)].map((_, index) => (
                <img src={assets.star_black} alt="rating" key={index} />
              ))}
            </div>

          </div>
          <p className='dcard_description'>{item.description}</p>
          <p className='dcard_price'>${item.price}</p>
        </div>
      </div>
    </>
  )
}

export default Dishdcard