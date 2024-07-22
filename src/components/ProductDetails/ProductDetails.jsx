import React from 'react'
import "./ProductDetails.css"
import PropTypes from "prop-types";
import Breadcrumb from "./Breadcrumb/Breadcrumb"
import Gallery from './Gallery/Gallery'
import Info from './Info/Info'
import Tabs from './Tabs/Tabs'
function ProductDetails({products}) {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery products={products}></Gallery>
              <Info  products={products}></Info>
            </main>
          </div>

          <Tabs></Tabs>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;

ProductDetails.propTypes={
  products:PropTypes.object,
}