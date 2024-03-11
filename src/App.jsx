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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/shoppage" element={<ShopPage></ShopPage>}></Route>
          <Route
            path="/contactpage"
            element={<ContactPage></ContactPage>}
          ></Route>
          <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
          <Route path="/cart" element={<CartPages></CartPages>}></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="/blogdetails" element={<BlogDetailsPage></BlogDetailsPage>}></Route>
          <Route path="/productDetails" element={<ProductDetailsPage></ProductDetailsPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
