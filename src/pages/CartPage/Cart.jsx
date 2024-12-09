import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addtocart,
  removefromcart,
  cartSubtotal,
  deliveryFees,
  cartTotal,
  sendtocart,
  resetOrderSuccess,
} from "../../store/cartSlice";
import { assets } from "../../assets/assets";
import Alerts from "../../components/Alerts";
import { validateForm } from "../../components/validateForm";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const calculatecartSubtotal = useSelector(cartSubtotal);
  const delivery = useSelector(deliveryFees);
  const finalAmount = useSelector(cartTotal);
  const dbUser = useSelector((state) => state.user.dbUser);
  const orderStatus = useSelector((state) => state.cart.orderSuccess);

  const [formwarning, setformwarning] = useState(false);

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [addrs, setaddrs] = useState("");
  const [city, setcity] = useState("");
  const [pin, setpin] = useState("");
  const [statename, setstatename] = useState("");
  const [phone, setphone] = useState("");

  const dispatch = useDispatch();

  // console.log(dbUser);

  function addQty(item) {
    // console.log(item)
    dispatch(addtocart({ menuItem: item, qty: 1 }));
  }

  function reduceqty(item) {
    // console.log(item)
    dispatch(removefromcart({ menuItem: item, qty: -1 }));
  }

  function proceedCart() {
    const validate = validateForm(
      fname,
      lname,
      addrs,
      city,
      pin,
      statename,
      phone
    );
    if (!validate) {
      setformwarning(true);
      setTimeout(() => {
        setformwarning(false);
      }, 2000);
    } else {
      const user = dbUser._id;
      const name = fname + " " + lname;
      const address = addrs + ", " + city + ", " + pin + ", " + statename;
      dispatch(
        sendtocart({
          cartItems,
          delivery,
          finalAmount,
          user,
          name,
          address,
          phone,
        })
      );
      setfname("");
      setlname("");
      setaddrs("");
      setcity("");
      setpin("");
      setstatename("");
      setphone("");
    }
  }

  useEffect(() => {
    if (orderStatus === "Success" || orderStatus === "Failed") {
      const alerttimer = setTimeout(() => {
        dispatch(resetOrderSuccess());
      }, 2000);
      return () => clearTimeout(alerttimer);
    }
  }, [orderStatus, dispatch]);

  return (
    <>
      {formwarning && (
        <Alerts status="Warning" message="Delivery information required" />
      )}
      {orderStatus === "Success" ? (
        <Alerts status="Success" message="Order placed successfully" />
      ) : orderStatus === "Failed" ? (
        <Alerts status="Error" message="Failed to place order, try again" />
      ) : null}
      <div className="cart_main">
        <div className="delivery_form">
          <h5>Delivery Information</h5>
          <form className="">
            <div className="form_div">
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="first name"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
              />
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="last name"
                value={lname}
                onChange={(e) => setlname(e.target.value)}
              />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="address"
              value={addrs}
              onChange={(e) => setaddrs(e.target.value)}
            />
            <div className="form_div">
              <input
                type="text"
                id="city"
                name="city"
                placeholder="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
              <input
                type="number"
                id="pin"
                name="pin"
                placeholder="pin"
                value={pin}
                onChange={(e) => setpin(e.target.value)}
              />
            </div>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="state"
              value={statename}
              onChange={(e) => setstatename(e.target.value)}
            />
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              maxLength={10}
            />
          </form>
        </div>
        <div className="cart">
          <h5>Cart Total</h5>
          {dbUser && cartItems.length > 0 ? (
            <div className="cart_summary">
              {cartItems.map((item) => (
                <div className="cart_item" key={item.menuItem._id}>
                  <div className="item_info">
                    <p className="title">{item.menuItem.title}</p>
                    <div className="manageqty">
                      <img
                        src={assets.remove_icon_red}
                        alt="removeqty"
                        className="dcard_ico"
                        onClick={() => reduceqty(item.menuItem)}
                      />
                      <p className="qty">{item.qty}</p>
                      <img
                        src={assets.add_icon_green}
                        alt="addqty"
                        className="dcard_ico"
                        onClick={() => addQty(item.menuItem)}
                      />
                    </div>
                    <p className="amount">${item.menuItem.price * item.qty}</p>
                  </div>
                </div>
              ))}
              <hr />
              <div className="other_charges">
                <div className="charges_calc">
                  <p>Subtotal:</p>
                  <p>${calculatecartSubtotal}</p>
                </div>
                <div className="charges_calc">
                  <p>delivery:</p>
                  <p>{delivery === 0 ? "FREE" : `$${delivery}`}</p>
                </div>
              </div>
              <hr />
              <div className="other_charges">
                <div className="charges_calc">
                  <p>Total:</p>
                  <p>${finalAmount}</p>
                </div>
              </div>
              <button className="proceed_button" onClick={proceedCart}>
                Proceed to Pay
              </button>
            </div>
          ) : (
            <div>No items added in cart</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;

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

{
  /* < form className = 'delivery_form' >
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
        </ > */
}
