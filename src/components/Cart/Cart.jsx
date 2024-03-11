import "./Cart.css";
import CartCoupon from "./CartCoupon";
import Progress from "./Progress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

function Cart() {
  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-page-wrapper">
          <form className="cart-form">
            <Progress />
            <div className="shop-table-wrapper">
              <CartTable />
              <CartCoupon />
            </div>
          </form>
          <div className="cart-collaterals">
            <CartTotals />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart