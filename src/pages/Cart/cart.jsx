import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useLiff } from "react-liff";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  const { isLoggedIn, liff } = useLiff();
  const [userId, setuserId] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      const profile = await liff.getProfile();

      setuserId(profile.userId);
    })();
  }, [liff, isLoggedIn]);

  const CheckLogin = () => {
    if (!isLoggedIn) {
      return alert("กรุณาเข้าสู่ระบบก่อนชำระเงิน");
    }
    return checkoutAndSendMessage();
  };

  const checkoutAndSendMessage = async () => {
    alert("ชำระเงินสำเร็จ");
    saveCartDataToFireStore(cartItems);
    sendMessage();
    // getCartData();
    // saveCart();
    checkout();
  };

  const sendMessage = async () => {
    liff
      .sendMessages([{ type: "text", text: "ชำระเงินสำเร็จ" }])
      .then(() => {
        window.alert("ชำระเงินสำเร็จ");
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const saveCartDataToFireStore = async (cartItems) => {
    const cartItemsCollection = collection(db, "orderHistory");
    const id = userId;

    const cartItemsData = [];

    PRODUCTS.forEach((product) => {
      if (cartItems[product.id] !== 0) {
        const { productName, price } = product;
        const quantity = cartItems[product.id];

        const cartItem = {
          productName: productName,
          price: price,
          quantity: quantity,
        };

        cartItemsData.push(cartItem);
      }
    });

    const orderData = {
      userId: id,
      totalPrice: totalAmount,
      cartItems: cartItemsData,
    };

    // Add the order data to Firestore
    addDoc(cartItemsCollection, orderData)
      .then(() => {
        console.log("Order data added to Firestore:", orderData);
      })
      .catch((error) => {
        console.error("Error adding order data to Firestore:", error);
      });
  };

  return (
    <div className="cart" style={{ marginTop: 80 }}>
      <div>
        <h1>สินค้าในตะกร้า ของคุณ</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <b>ราคาสินค้าทั้งหมด : {totalAmount} บาท</b>
          <br />
          <button onClick={() => navigate("/")}>ซื้อสินค้าต่อ</button>
          <button
            onClick={() => {
              CheckLogin();
            }}
          >
            ชำระเงิน
          </button>
        </div>
      ) : (
        <h1>ตะกร้าของคุณไม่มีสินค้า</h1>
      )}
    </div>
  );
};
