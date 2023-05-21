import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useLiff } from "react-liff";
import "./orderhistory.css";

export const OrderHistory = () => {
  const [orderData, setOrderData] = useState([]);
  const { isLoggedIn, liff } = useLiff();
  const [userId, setuserId] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      const profile = await liff.getProfile();

      setuserId(profile.userId);
    })();
  }, [liff, isLoggedIn]);

  const fetchOrderData = async () => {
    const cartItemsCollection = collection(db, "orderHistory");

    try {
      const querySnapshot = await getDocs(cartItemsCollection);
      const orders = [];
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        if (order.userId === userId) {
          orders.push(order);
        }
      });
      setOrderData(orders);
    } catch (error) {
      console.error("Error querying order data:", error);
    }
  };

  fetchOrderData();

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">ประวัติการสั่งซื้อ</h2>
      {orderData.length === 0 ? (
        <p className="order-history-message">
          ไม่เจอข้อมูลการสั่งของลูกค้า ID : {userId}
        </p>
      ) : (
        <ul className="order-history-list">
          {orderData.map((order, index) => (
            <li className="order-history-item" key={index}>
              <h3>คำสั่งซื้อ #{index + 1}</h3>
              <ul>
                {order.cartItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="order-item-details">
                    <p className="order-item-info">{item.quantity}</p>
                    <p className="order-item-info">{item.productName}</p>
                    <p className="order-item-price">
                      {item.price * item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
              <p>
                <b>ราคาทั้งหมด : {order.totalPrice} บาท</b>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
