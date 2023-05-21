import React, { useEffect, useState, useContext } from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import "./header.css";
import { useLiff } from "react-liff";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

function Header() {
  const { getTotalItemInCart } = useContext(ShopContext);
  const totalItem = getTotalItemInCart();

  const [showMenu, setShowMenu] = useState(false);

  const { error, isLoggedIn, isReady, liff } = useLiff();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
    })();
  }, [liff, isLoggedIn]);

  const loginHandler = () => {
    liff.login();
  };

  const logoutHandler = () => {
    liff.logout();
  };

  const handleMenuClick = () => {
    setShowMenu(false);
  };

  const Login = () => {
    if (!isLoggedIn) {
      return (
        <button className="loginBTN" onClick={loginHandler}>
          Login
        </button>
      );
    }
    return (
      <>
        {/* <p style={{ padding: 5 }}>สวัสดีคุณ {displayName}</p> */}
        <button className="loginBTN" onClick={logoutHandler}>
          Logout
        </button>
      </>
    );
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        background: "#E74646",
        color: "#fff",
        padding: "10px 20px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        zIndex: 999,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <FaBars
          style={{ marginRight: "20px", cursor: "pointer" }}
          onClick={() => setShowMenu(!showMenu)}
        />
        <Link
          to="/"
          className="no-underline"
          style={{ margin: 0, textAlign: "center", flex: 1 }}
        >
          Chujai Delivery
        </Link>
      </div>
      <Link
        to="/cart"
        style={{ display: "flex", alignItems: "center" }}
        className="no-underline"
      >
        <FaShoppingCart
          size={18}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />
        <p>{totalItem}</p>
      </Link>
      <div
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          background: "#FF5D5D",
          width: "100%",
          display: showMenu ? "block" : "none",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li
            style={{ display: "block", textAlign: "left", padding: "5px" }}
            onClick={handleMenuClick}
          >
            <Link to="/orderhistory" className="no-underline">
              ประวัติการสั่งซื้อ
            </Link>
          </li>
          <li
            style={{ display: "block", textAlign: "left", padding: "5px" }}
            onClick={handleMenuClick}
          >
            <Link to="/address" className="no-underline">
              ที่อยู่ของฉัน
            </Link>
          </li>
          <li style={{ marginBottom: 7 }} onClick={handleMenuClick}>
            {Login()}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
