import React, { useState } from "react";
import "./ProductItem.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartProvider";

function ProductItem({ item, key }) {
  const { addCart,cartItems } = useCart();

  const filteredCart=cartItems.find(x=>x._id===item._id);//sepete eklenen ürünü buluyoruz
  console.log(filteredCart);

const originalPrice=item.price.current
const discountPercent=item.price.discount
  //indirimli fiyat hesaplama
  const discountPrice=originalPrice - (originalPrice*discountPercent) /100;


  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={item.img[1]} alt="" className="img1" />
          <img src={item.img[2]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {item.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">${discountPrice}</strong>
          <span className="old-price">${item.price.current}</span>
        </div>
        <span className="product-discount">{item.price.discount}%</span>
        <div className="product-links">
          <button onClick={() => addCart({...item,price:discountPrice})} disabled={filteredCart} className="add-to-cart">
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/productDetails/${item._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
ProductItem.propTypes = {
  item: PropTypes.object,
};
