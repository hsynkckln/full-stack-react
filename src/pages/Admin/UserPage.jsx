import React, { useEffect, useState } from "react";
import { Button, Table, Popconfirm } from "antd";
import { message } from "antd";
function UserPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/users`);

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

  const deleteUser=async(userEmail)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userEmail}`,{
        method:"DELETE",

      });

      if (response.ok) {
        fetchUsers()
      } else {
        message.error("silme başarısız");
      }
      console.log(response);
    } catch (error) {
      console.log("silme hatası:", error);
    } 
  }

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text,record) => (
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Silmek istediğine eminmisin?"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={()=>deleteUser(record.email)}
        >
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        ></img>
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

export default UserPage;
