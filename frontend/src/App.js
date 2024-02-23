import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import NewCollections from "./Components/NewCollections/NewCollections";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Checkout from "./Pages/Checkout";
import { useEffect, useState } from "react";

function App() {

  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {!token && <Route path="/" element={<LoginSignup />} />}
          {token && (
            <>
              <Route path="/" element={<Shop />} />
              <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
              <Route path="/womens" element={<ShopCategory banner={women_banner} category="woman" />} />
              <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
              <Route path="/product" element={<Product />}>
                <Route path=":productId" element={<Product />} />
              </Route>
              <Route path="/newcollections" element={<NewCollections />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
            </>
          )}
          {/* Kullanıcı giriş yapmamışsa ve token yoksa, geçiş izni verme */}
          {!token && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
