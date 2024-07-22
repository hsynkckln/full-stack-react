import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form]=Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    
    const imgLinks=values.img.split("\n").map((item)=>item.trim())//linkleri ayırmak için bu fonksiyonu yazıyoruz.
    const colors=values.colors.split("\n").map((item)=>item.trim())
    const size=values.size.split("\n").map((item)=>item.trim())
    
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products`, {
        method: "POST",
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
        message.success("Ekleme başarılı");
        form.resetFields();
      } else {
        message.error("Ekleme başarısız");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
            {dataSource.map((item, key) => (
              <Select.Option value={key} key={key}>
                {item.name}
              </Select.Option>
            ))}
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
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default CreateProductPage;
