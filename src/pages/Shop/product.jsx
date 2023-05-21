import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, description, price, productImage, category } =
    props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemsAmount = cartItems[id];
  return (
    <div className="product">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>{price} บาท</p>
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
          ใส่ตะกร้า {cartItemsAmount > 0 && <> ({cartItemsAmount})</>}
        </button>
      </div>
    </div>
  );
};
