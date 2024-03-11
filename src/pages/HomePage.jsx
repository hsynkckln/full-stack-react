import React from "react";
import Header from "../components/Header/Header"
import Slider from "../components/Slider/Slider"
import Categories from "../components/Categories/Categories"
import Products from "../components/Products/Products"
import Campaigns from "../components/Campaigns/Campaigns"
import Blogs from "../components/Blogs/Blogs"
import Brands from "../components/Brands/Brands"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import Policy from "../components/Policy/Policy"
import Footer from "../components/Footer/Footer"
function HomePage() {
  return (
    <div>
      <Header></Header>
      <Slider></Slider>
      <Categories></Categories>
      <Products></Products>
      <Campaigns></Campaigns>
      <Blogs></Blogs>
      <Brands></Brands>
      <CampaignSingle></CampaignSingle>
      <Policy></Policy>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
