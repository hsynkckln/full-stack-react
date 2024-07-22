import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
function UpdateCouponsPage() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(id);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        message.success("Güncelleme başarılı");
        navigate("/admin/coupons");
      } else {
        message.error("Güncelleme başarısız");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${id}`
      );

      if (response.ok) {
        const data2 = await response.json();
        form.setFieldsValue({
          code: data2.code,
          discountPercent: data2.discountPercent,
        });

        console.log(data2);
      }
      console.log(response);
    } catch (error) {
      console.log("Giriş hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleCategory();
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
          label="Kod"
          name="code"
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
          label="İndirim oranı"
          name="discountPercent"
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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateCouponsPage;
