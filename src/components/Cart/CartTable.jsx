import React from 'react'
import CartItem from './CartItem'
import { useCart } from "../../context/CartProvider";
function CartTable() {
  const {cartItems}=useCart();
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {cartItems.map((item,key)=>(
          <CartItem item={item} key={key}/>
        ))}
        
        
      </tbody>
    </table>
  )
}

export default CartTable