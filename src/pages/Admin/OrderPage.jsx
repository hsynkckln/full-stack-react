import React, { useEffect, useState } from "react";
import { Spin, Table  } from "antd";
import { message } from "antd";


function OrderPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
    
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.stripe.com/v1/payment_intents`,{
        method:"GET",
        headers:{
          Authorization:`Bearer ${"sk_test_51PPNNwRrScK7QPPQF4uPziOHGzljI9BtVz8f36YMybsSXqk3W5Tw1bKmHJCqQGAtnDlQdQMAhcmUjRXQ3L4gR1Ch00rbzG4dh0"}`,

        }
      });

      if (response.ok) {
        const {data} = await response.json();
        setDataSource(data);
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
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log(dataSource);

  
  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
      key: "receipt_email",
      // render: (imgSrc) => <img src={imgSrc} style={{ width: 100 }}></img>,
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      key: "amount",
      
    },

    
  ];
  return (
    <Spin spinning={loading}>
      <Table
        rowKey={(record)=>record.id}
        dataSource={dataSource}
        columns={columns}
        
      />
    </Spin>
  );
}

export default OrderPage;
