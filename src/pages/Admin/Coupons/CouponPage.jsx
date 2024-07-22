import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm, Space } from "antd";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
function CouponPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/coupons`);

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

  const deleteCoupons = async (couponsDelete) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${couponsDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchUsers();
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
      title: "Kupon kodu",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>,
    },
    {
      title: "İndirim oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <b>%{text}</b>,
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
            
            <Button type="primary"  onClick={()=>navigate(`/admin/coupons/update/${record._id}`)}>
              Güncelle
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Kategori Sil"
            description="Silmek istediğine eminmisin?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCoupons(record._id)}
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

export default CouponPage;
