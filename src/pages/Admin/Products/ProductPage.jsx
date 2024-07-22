import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, Space } from "antd";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
function ProductPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const[categoriesResponse,productsResponse]=await Promise.all([
        fetch(`http://localhost:5000/api/categories`),
        fetch(`http://localhost:5000/api/products`),

      ])
      if(!categoriesResponse.ok || !productsResponse.ok){
        message.error("veri getirme başarısız")
      }
      const [categoriesData,productsData]=await Promise.all([
        categoriesResponse.json(),
        productsResponse.json()
      ])

      const productsWithCategory=productsData.map((item)=>{
        const categoryId=item.category
        const category=categoriesData.map((category)=>{
          console.log(category);
          return category._id===categoryId
        });
        
        return{
          ...item,
          categoryName:category ? category.name : "",
        }
        
      })
      setDataSource(productsWithCategory)
      
      
    } catch (error) {
      console.log("Giriş hatası:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(dataSource);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {

      
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        //fetchData();
        setDataSource((prevProducts)=>{
          return prevProducts.filter((products)=>products._id !=productId)
        })
        message.success("silme başarılı");
      } else {
        message.error("silme başarısız");
      }
      console.log(response);
    } catch (error) {
      console.log("silme hatası:", error);
    }
  };

  

  const columns = [
    {
      title: "Product Görsel",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} style={{ width: 100 }}></img>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render:(text)=><b>{text}</b>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render:(text)=><span>{text.current.toFixed(2)} TL</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render:(text)=><span>{text.discount} %</span>,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space >
          <Popconfirm
            title="Kategori Güncelle"
            description="Güncellemek istediğine eminmisin?"
            okText="Evet"
            cancelText="Hayır"
            
          >
            
            <Button type="primary"  onClick={()=>navigate(`/admin/products/update/${record._id}`)}>
              Güncelle
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Kategori Sil"
            description="Silmek istediğine eminmisin?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowKey={(record) => record._id}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
      />
    </div>
  );
}

export default ProductPage;
