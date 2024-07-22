import { Button, Form, Input, Spin, message } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateCategoryPage() {
  const [loading,setLoading]=useState(false);
  const [form]=Form.useForm();
  const navigate=useNavigate();
  const onFinish=async(values)=>{
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        message.success("Ekleme başarılı");
        navigate("/admin/categories");
      } else {
        message.error("Ekleme başarısız");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


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
          label="Name"
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
          label="Image"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
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
  )
}

export default CreateCategoryPage