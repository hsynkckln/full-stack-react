import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Proptypes from "prop-types"
import Search from '../components/Modals/Search/Search'
import Dialog from '../components/Modals/Dialog/Dialog'
function MainLayout({children}) {
  const [isSearchShow,setIsSearchShow]=useState(false)
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

      console.log(dialogStatus);
    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);
  return (
    <>
        
        <div className="main-layout">
          <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow}></Dialog>
          <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}></Search>
          <Header setIsSearchShow={setIsSearchShow}></Header>
        </div>
        {children}
        <Footer></Footer>
    </>
  )
}

export default MainLayout
MainLayout.propTypes={
    children:Proptypes.node
}