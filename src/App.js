import React, { useEffect, useState } from "react";
import { useLiff } from "react-liff";
import Header from "./components/Header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from "./pages/Shop/shop";
import { Cart } from "./pages/Cart/cart";
import { Address } from "./pages/Address/address";
import { OrderHistory } from "./pages/OrderHistory/orderhistory";
import { ShopContextProvider } from "./context/shop-context";
import "./App.css";
import liff from "@line/liff";

const App = () => {
  const [displayName, setDisplayName] = useState("");

  const { error, isLoggedIn, isReady, liff } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const name = await liff.getProfile();

      setDisplayName(name.displayName);
    })();
  }, [liff, isLoggedIn]);

  const showProfile = () => {
    if (error) return <p>มีข้อผิดพลาดในระบบ.</p>;
    if (!isReady) return <p>กำลังโหลดกรุณารอสักครู่...</p>;

    if (!isLoggedIn) {
      return (
        <button className="App-button" onClick={liff.login}>
          Login
        </button>
      );
    }
    return (
      <>
        <button className="App-button" onClick={liff.logout}>
          Logout
        </button>
      </>
    );
  };

  return (
    <div className="App">
      <ShopContextProvider>
        <Router basename={"/Chujai"}>
          <Header />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
};

export default App;
