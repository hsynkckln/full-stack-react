import React from 'react'
import Header from '../components/Header/Header'
import Blogs from '../components/Blogs/Blogs'
import Footer from '../components/Footer/Footer'

function BlogPage() {
  return (
    <div>
        <Header></Header>
        <div className='blog-page'>
            <Blogs></Blogs>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default BlogPage