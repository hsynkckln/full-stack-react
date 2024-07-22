import React, { useState } from "react";
import "./Search.css";
import PropTypes from "prop-types";
import { message } from "antd";
function Search({ isSearchShow, setIsSearchShow }) {
  const [productData, setProductData] = useState(null);

  const handeCloseModal=()=>{
    setIsSearchShow(false)
    setProductData(null)
  }

  const handleSearc = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/search/${productName.trim()}`
      );
      if (!response.ok) {
        message.error("ürün getirme hatası");
        return;
      }
      const data = await response.json();

      setProductData(data);
      console.log(productData);
    } catch (error) {
      console.log(error);
    }
    // console.log(e.target[0].value);//ayrı bi state oluşturmadan inputun değerini böyle alabiliriz
  };
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={handleSearc}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          {productData?.length === 0 ? (
            <b className="result-item" style={{justifyContent:"center",width:"100%"}}>
              Aradığınız ürün bulunamadı
            </b>
          ) : (
            <div>
              {productData?.map((item, key) => (
                <div className="results" key={key}>
                  <a href="#" className="result-item">
                    <img src={item.img[0]} className="search-thumb" alt="" />
                    <div className="search-info">
                      <h4>{item.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">
                        ${item.price.current.toFixed(2)}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={() => handeCloseModal()}
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={() => handeCloseModal()}
      ></div>
    </div>
  );
}

export default Search;
Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
