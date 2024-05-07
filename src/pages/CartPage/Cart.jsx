import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addtocart, removefromcart, cartSubtotal, deliveryFees, cartTotal } from '../../store/cartSlice'
import { assets } from '../../assets/assets'

function Cart() {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const calculatecartSubtotal = useSelector(cartSubtotal)
  const delivery = useSelector(deliveryFees)
  const finalAmount = useSelector(cartTotal)

  const dispatch = useDispatch()

  // console.log(cartItems)

  function addQty(item) {
    // console.log(item)
    dispatch(addtocart({ 'menuItem': item, 'qty': 1 }))

  }

  function reduceqty(item) {
    // console.log(item)
    dispatch(removefromcart({ 'menuItem': item, 'qty': -1 }))
  }

  return (
    <>
      <div className='cart_main'>
        <div className='delivery_form'>
          <h5>Delivery Information</h5>
          <form className='' >
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
        </div>
        <div className='cart'>
          <h5>Cart Total</h5>
          {cartItems.length > 0 ?
            < div className='cart_summary' >
              {
                cartItems.map(item => (
                  <div className='cart_item' key={item.menuItem._id}>
                    <div className='item_info'>
                      <p className='title'>{item.menuItem.name}</p>
                      <div className='manageqty'>
                        <img src={assets.remove_icon_red} alt="removeqty" className='dcard_ico' onClick={() => reduceqty(item.menuItem)} />
                        <p className='qty'>{item.qty}</p>
                        <img src={assets.add_icon_green} alt="addqty" className='dcard_ico' onClick={() => addQty(item.menuItem)} />
                      </div>
                      <p className='amount'>${item.menuItem.price * item.qty}</p>
                    </div>
                  </div>
                ))
              }
              <hr />
              <div className='other_charges' >
                <div className='charges_calc'>
                  <p>Subtotal:</p>
                  <p>${calculatecartSubtotal}</p>
                </div>
                <div className='charges_calc'>
                  <p>delivery:</p>
                  <p>{delivery === 0 ? 'FREE' : delivery}</p>
                </div>
              </div >
              <hr />
              <div className='other_charges'>
                <div className='charges_calc'>
                  <p>Total:</p>
                  <p>${finalAmount}</p>
                </div>
              </div>
              <button className='proceed_button'>Proceed to Pay</button>
            </div >
            :
            <div>No items added in cart</div>
          }

        </div>
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

// {
//   cartItems.map(item => (
//     < div className='cart_item' key={item.menuItem._id} >
//       <p className='title'>{item.menuItem.name}</p>
//       <div className='manageqty'>
//         <img src={assets.remove_icon_red} alt="removeqty" className='dcard_ico' onClick={() => reduceqty(item.menuItem)} />
//         <p className='qty'>{item.qty}</p>
//         <img src={assets.add_icon_green} alt="addqty" className='dcard_ico' onClick={() => addQty(item.menuItem)} />
//       </div>
//       <p className='amount'>${item.menuItem.price * item.qty}</p>
//     </ div >
//   ))
// }


// < div className = 'cart_summary' >
// {
//   cartItems.map(item => (
//     <div className='cart_item' key={item.menuItem._id}>
//       <div className='item_info'>
//         <p className='title'>{item.menuItem.name}</p>
//         <div className='manageqty'>
//           <img src={assets.remove_icon_red} alt="removeqty" className='dcard_ico' onClick={() => reduceqty(item.menuItem)} />
//           <p className='qty'>{item.qty}</p>
//           <img src={assets.add_icon_green} alt="addqty" className='dcard_ico' onClick={() => addQty(item.menuItem)} />
//         </div>
//         <p className='amount'>${item.menuItem.price * item.qty}</p>
//       </div>
//     </div>
//   ))
// }
//   < div className = 'other_charges' >
//               <div className='charges_calc'>
//                 <p>Subtotal:</p>
//                 <p>${calculatecartSubtotal}</p>
//               </div>
//               <div className='charges_calc'>
//                 <p>delivery:</p>
//                 <p>{delivery === 0 ? 'FREE' : delivery}</p>
//               </div>
//             </ >
//             <div className='other_charges'>
//               <div className='charges_calc'>
//                 <p>Total:</p>
//                 <p>${finalAmount}</p>
//               </div>
//             </div>
//             <button className='proceed_button'>Proceed to Pay</button>
//           </div >

{/* < form className = 'delivery_form' >
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
        </ > */}