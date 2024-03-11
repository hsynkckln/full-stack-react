import React from 'react'
import Header from '../components/Header/Header'
import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'
import CampaignSingle from '../components/CampaignSingle/CampaignSingle'
import Policy from '../components/Policy/Policy'
import Footer from '../components/Footer/Footer'

function ShopPage() {
  return (
    <>
    <Header></Header>
    <Categories></Categories>
    <Products></Products>
    <CampaignSingle></CampaignSingle>
    <Products></Products>
    <Policy></Policy>
    <Footer></Footer>
    </>
  )
}

export default ShopPage