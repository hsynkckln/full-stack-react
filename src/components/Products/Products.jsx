import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import {  message } from "antd";
function nextBtn({ onClick }){
  return (
    <button onClick={onClick} className="glide__arrow glide__arrow--right">
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};
nextBtn.propTypes = {
  onClick: PropTypes.func,
};

function prevBtn({ onClick }) {
  return (
    <button onClick={onClick} className="glide__arrow glide__arrow--left">
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}
prevBtn.propTypes={
  onClick:PropTypes.func,
};

function Products() {
  const [products,setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products`);

      if (response.ok) {
        const data2 = await response.json();
        setProducts(data2);
      } else {
        message.success("giriş başarısız");
      }
      console.log(response);
    } catch (error) {
      console.log("Giriş hatası:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <nextBtn/>,
    prevArrow: <prevBtn/>,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track">
            <Slider {...settings}>
              {products.map((item, key) => (
                <ProductItem  item={item} key={key} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
