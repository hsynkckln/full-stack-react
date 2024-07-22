import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import {  message } from "antd";

import "./Category.css";
function Categories() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);

      if (response.ok) {
        const data2 = await response.json();
        setDataSource(data2);
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
  console.log(dataSource);

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {dataSource.map((item,key)=>(
            <CategoryItem item={item} key={key} />
          ))}
          
          
        </ul>
      </div>
    </section>
  );
}

export default Categories;
