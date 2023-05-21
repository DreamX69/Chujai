import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { RadioButtonGroup } from "../../components/RadioButtonGroup/radiobuttongroup";

export const CartItem = (props) => {
  const { id, productName, description, price, productImage, category, warm } =
    props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemsCount } =
    useContext(ShopContext);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption) {
      console.log("Form submitted with selected option:", selectedOption);
    } else {
      console.log("Please select an option");
    }
  };
  return (
    <div className="cartItem">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>{price * cartItems[id]} บาท</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            type="number"
            value={cartItems[id]}
            onChange={(e) => updateCartItemsCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
        <div style={{ marginTop: 7 }}>
          <RadioButtonGroup
            options={["อุ่น", "ไม่อุ่น"]}
            onChange={handleOptionChange}
            show={warm === "yes"}
          />
        </div>
      </div>
    </div>
  );
};
