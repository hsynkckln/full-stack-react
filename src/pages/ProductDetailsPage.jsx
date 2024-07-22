import React, { useEffect, useState } from "react";

import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import { message } from "antd";

function ProductDetailsPage() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);

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
  }, [id]);
  return products ? (
    <div>
      <ProductDetails products={products}></ProductDetails>
    </div>
  ) : (
    <p>ürün yükleniyor</p>
  );
}

export default ProductDetailsPage;
