import React from 'react'
import "./Categories.css";
function CategoryItem({item}) {
  return (
    <li className="category-item">
      <a href="#">
        <img
          src={item.img}
          alt=""
          className="category-image"
        />
        <span  className="category-title">{item.name}</span>
      </a>
    </li>
  )
}

export default CategoryItem