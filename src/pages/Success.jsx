import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useEffect } from "react";

function Success() {
  const { setCartItems } = useCart();

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);
  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme başarılı"
          subTitle="Siparişiniz tamamlandı"
          extra={[
            <Link to="/">
              <Button type="primary" key="console">
                Ana sayfa
              </Button>
            </Link>,

            <a href="/admin/orders">
              <Button type="primary" key="console">
                Siparişlerim
              </Button>
            </a>,
          ]}
        />
      </div>
    </div>
  );
}

export default Success;
