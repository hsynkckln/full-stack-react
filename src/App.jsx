import "./App.css";
import AuthPage from "./pages/AuthPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogPage from "./pages/BlogPage";
import CartPages from "./pages/CartPages";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopPage from "./pages/ShopPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import UpdateCouponsPage from "./pages/Admin/Coupons/UpdateCouponsPage";
import CreateCouponsPage from "./pages/Admin/Coupons/CreateCouponsPage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/shoppage" element={<ShopPage></ShopPage>}></Route>
        <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
        <Route
          path="/contactpage"
          element={<ContactPage></ContactPage>}
        ></Route>
        <Route path="/cart" element={<CartPages></CartPages>}></Route>
        <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
        <Route
          path="/blogdetails/:id"
          element={<BlogDetailsPage></BlogDetailsPage>}
        ></Route>
        <Route
          path="/productDetails/:id"
          element={<ProductDetailsPage></ProductDetailsPage>}
        ></Route>
        <Route
          path="/success"
          element={<Success></Success>}
        ></Route>
        <Route path="/admin/*">
          <Route path="users" element={<UserPage></UserPage>}></Route>
          <Route path="categories" element={<CategoryPage></CategoryPage>}></Route>
          <Route path="categories/update/:id" element={<UpdateCategoryPage></UpdateCategoryPage>}></Route>
          <Route path="categories/create" element={<CreateCategoryPage></CreateCategoryPage>}></Route>
          <Route path="products/create" element={<CreateProductPage></CreateProductPage>}></Route>
          <Route path="products" element={<ProductPage></ProductPage>}></Route>
          <Route path="products/update/:id" element={<UpdateProductPage></UpdateProductPage>}></Route>
          <Route path="coupons" element={<CouponPage></CouponPage>}></Route>
          <Route path="coupons/update/:id" element={<UpdateCouponsPage></UpdateCouponsPage>}></Route>
          <Route path="coupons/create" element={<CreateCouponsPage></CreateCouponsPage>}></Route>
          <Route path="orders" element={<OrderPage></OrderPage>}></Route>
        </Route>
       
      </Routes>
    </>
  );
}

export default App;
