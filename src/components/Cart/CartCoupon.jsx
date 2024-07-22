import { message } from "antd";
import React, { useState } from "react";
import { useCart } from "../../context/CartProvider";

function CartCoupon() {
  const[couponCode,setCouponCode]=useState("")
  const{cartItems,setCartItems}=useCart();
  const applyCoupon=async()=>{
    console.log(couponCode);
    if(couponCode.trim().length===0){
      return message.warning("boş değer girilemez")
    }
    try {
      const response = await fetch(`http://localhost:5000/api/coupons/code/${couponCode}`);

      if(!response.ok){
        message.warning("girdiğiniz kupon hatalı")
      }
      const data=response.json()
      const discountPercent=data.discountPercent;

      const updatedCartItems=cartItems.map((item)=>{
        const updatePrice=item.price * (1-discountPercent/100)
        return {...item,price:updatePrice}
      })
      setCartItems(updatedCartItems);
      message.success(`${couponCode} kupon kodu başarıyla uygulandı`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input type="text" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} className="input-text" placeholder="Coupon code" />
        <button type="button" className="btn" onClick={applyCoupon}>Apply Coupon</button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
}

export default CartCoupon;
