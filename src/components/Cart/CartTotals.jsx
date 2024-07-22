import React, { useState } from "react";
import { useCart } from "../../context/CartProvider";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

function CartTotals() {
  const {cartItems}=useCart();
  const [fastCargo,setFastCargo]=useState(false);

  const cartItemTotals=cartItems.map((item)=>{
    const itemTotal=item.price*item.quantity;

    return itemTotal
  })
  

  const subTotals=cartItemTotals.reduce((pre,cur)=>{
    return pre+cur
  },0);
  

  const cargoFee=15;
  const cartTotals=fastCargo ? (subTotals+cargoFee).toFixed(2) : subTotals.toFixed(2);

  const user=localStorage.getItem("user") ?
  JSON.parse(localStorage.getItem("user")) : null;

  const handlePayment=async()=>{
    if(!user){
      return message.info("ödeme yapabilmek için giriş yapmalısınız")
    }
    const body={
      products:cartItems,
      users:user,
      cargoFee:fastCargo ? cargoFee : 0
    }

    try {
      const stripe=await loadStripe("pk_test_51PPNNwRrScK7QPPQQDryxFL9Ck8UHgOHBrKTmD4cieplhbaeH5B5LT8DKzbgABivYfmVDtCuZlRflpVzLYWmOlSK00YzMXb6gY")
      
      const res=await fetch(`http://localhost:5000/api/payment`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)

      });
      if(!res.ok){
        return message.warning("ödeme işlemi başarısız oldu")
      }
      const session=await res.json();
      const result=await stripe.redirectToCheckout({
        sessionId:session.id,
      })
      if(result.error){
        throw new Error(result.error.message)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input checked={fastCargo} onChange={()=>setFastCargo(!fastCargo)} type="checkbox" id="fast-cargo" />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>Proceed to checkout</button>
      </div>
    </div>
  );
}

export default CartTotals;
