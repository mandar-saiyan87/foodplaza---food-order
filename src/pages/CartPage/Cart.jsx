import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addtocart, removefromcart } from '../../store/cartSlice'

function Cart() {

  const cartItems = useSelector((state) => state.cart.cartItems)

  console.log(cartItems)

  return (
    <>
      <div className='cart_main'>
        <Container className='text-center'>
          <h5>Delivery Information</h5>
          <form className='delivery_form'>
            <div className='form_div'>
              <input type="text" id='fname' name='fname' placeholder='first name' />
              <input type="text" id='lname' name='lname' placeholder='last name' />
            </div>
            <input type="text" id='address' name='address' placeholder='address' />
            <div className='form_div'>
              <input type="text" id='city' name='city' placeholder='city' />
              <input type="number" id='pin' name='pin' placeholder='pin' />
            </div>
            <input type="text" id='state' name='state' placeholder='state' />
            <input type="number" id='phone' name='phone' placeholder='phone' />
          </form>
        </Container>
        <Container className='text-center'>
          <h5>Cart Total</h5>
          <div>
            {cartItems.length > 0 ?
              cartItems.map(item => (
                <div className='cart_item' >
                  <p className='title'>{item.menuItem.name}</p>
                  <p className='qty'>{item.qty}</p>
                  <p className='amount'>{item.menuItem.price}</p>
                </ div>
              )) :
              <div>No items added to cart</div>
            }
          </div>
        </Container>
      </div>
    </>
  )
}

export default Cart

// < div className = 'cart_item' >
//                 <p>{item.menuItem.name}</p>
//                 <p>{item.qty}</p>
//                 <p>{item.menuItem.price}</p>
//               </ >