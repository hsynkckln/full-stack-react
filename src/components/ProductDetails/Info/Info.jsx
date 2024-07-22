
import "./Info.css";
import { useCart } from "../../../context/CartProvider";
import { useRef } from "react";
function Info({ products }) {

  const {addCart,cartItems}=useCart()

  const quantityRef=useRef();//inputun içeriisndeki değeri usestate gerek olmadan alırız
  const originalPrice = products.price.current;
  const discountPercent = products.price.discount;
  //indirimli fiyat hesaplama
  const discountPrice = originalPrice - (originalPrice * discountPercent) / 100;
  const filteredProduct=cartItems.find(item=>item._id==products._id)
  return (
    <div className="product-info">
      <h1 className="product-title">{products.name}</h1>
      <div className="product-review">
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
        <span>{products.reviews.length} yorum</span>
      </div>
      <div className="product-price">
        <s className="old-price">${products.price.current.toFixed(2)}</s>
        <strong className="new-price">${discountPrice.toFixed(2)}</strong>
      </div>
      <p className="product-description" dangerouslySetInnerHTML={{__html:products.description}}>
        
      </p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {products.colors.map((item,key)=>(
                <div className="color-wrapper active" key={key}>
                  <label style={{backgroundColor:`#${item},`}}>
                    <input type="radio" name="product-color" />
                  </label>
                </div>
              ))}
              
             
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {products.size.map((item,key)=>(
                <span  key={key}>{item.toUpperCase()}</span>
              ))}
              
             
              
            </div>
          </div>
          <div className="cart-button">
            <input type="number" value="1" min="1" id="quantity" ref={quantityRef} />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              disabled={filteredProduct}
              type="button"
              onClick={()=>addCart({...products,price:discountPrice,quantity:parseInt(quantityRef.current.value)})}
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
}

export default Info;
