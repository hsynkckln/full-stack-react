import React from "react";
import { useCart } from "../../context/CartProvider";


function CartItem({item}) {
  const {removeCart}=useCart();
  
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={item.img[0]} alt="" />
        <i className="bi bi-x delete-cart" onClick={()=>removeCart(item)} data-id="1"></i>
      </td>
      
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td className="product-quantity">{item.quantity}</td>
      <td className="product-subtotal">${(item.price*item.quantity).toFixed(2)}</td>
    </tr>
  );
}

export default CartItem;
