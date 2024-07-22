import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
function UpdateProductPage() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(products);

  const onFinish = async (values) => {
    console.log(values);
    
    const imgLinks=values.img.split("\n").map((item)=>item.trim())//linkleri ayırmak için bu fonksiyonu yazıyoruz.
    const colors=values.colors.split("\n").map((item)=>item.trim())
    const size=values.size.split("\n").map((item)=>item.trim())
    
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price:{
            current:values.current,
            discount:values.discount
          },
          colors,
          size,
          img:imgLinks,
        }),
      });
      if (response.ok) {
        message.success("Güncelleme başarılı");
        navigate("/admin/products")
        form.resetFields();
      } else {
        message.error("Güncelleme hatası");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        fetch(`http://localhost:5000/api/categories`),
        fetch(`http://localhost:5000/api/products/${id}`),
      ]);
      if (!categoriesResponse.ok || !productsResponse.ok) {
        message.error("veri getirme başarısız");
      }
      const [categoriesData, productsData] = await Promise.all([
        categoriesResponse.json(),
        productsResponse.json(),
      ]);

      setCategories(categoriesData);
      setProducts(productsData);

      if (productsData) {
        form.setFieldsValue({
          name: productsData.name,
          img: productsData.img.join("\n"),
          current: productsData.price.current,
          discount: productsData.price.discount,
          description: productsData.description,
          size: productsData.size.join("\n"),
          colors: productsData.colors.join("\n"),
          category: productsData.category,
        });
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id,form]);

  // const fetchSingleCategory = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/products/${id}`
  //     );

  //     if (response.ok) {
  //       const data2 = await response.json();
  //       console.log(data2);
  //       form.setFieldsValue({
  //         name: data2.name,
  //         img: data2.img,
  //         price:{
  //           current:data2.current,
  //           discount:data2.discount
  //         },
  //         colors:data2.colors,
  //         size:data2.size,
  //         description:data2.description
  //       });

  //       console.log(data2);
  //     }
  //     console.log(response);
  //   } catch (error) {
  //     console.log("Giriş hatası:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchSingleCategory();
  // }, []);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish} //bu metot sayesinde form içine girdiğimiz bilgileri obje halinde fonksiyona alabiliriz.
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün kategorisi seçin",
            },
          ]}
        >
          <Select>
            <Select.Option value={products.name} key={products._id}>
              {products.name}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Ürün Fiyatı"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatı girin",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen ürün indirim oranı girin",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen ürün açıklaması girin",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Ürün Resmi"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün görseli giriniz",
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4 }}
            placeholder="Her bir görsel linkini yeni bir satıra yazın"
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri(RGB Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi giriniz",
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4 }}
            placeholder="Her bir rgb kodunu yeni bir satıra yazın"
          />
        </Form.Item>

        <Form.Item
          label="Ürün bedenleri(S,M,L,XL)"
          name="size"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün bedeni giriniz",
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4 }}
            placeholder="Her bir ürün bedenini yeni bir satıra yazın"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateProductPage;
