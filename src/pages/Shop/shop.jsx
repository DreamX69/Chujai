import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? PRODUCTS.filter((product) => product.category === selectedCategory)
    : PRODUCTS;
  return (
    <div className="shop">
      <div className="shopTitle"></div>
      <div className="categoryselect">
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter(null)}
        >
          สินค้าทั้งหมด
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("snack")}
        >
          อาหารรองท้อง ทานเล่น
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("bakery")}
        >
          เบเกอรี่
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("ready to eat food")}
        >
          อาหารพร้อมทาน
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("dessert")}
        >
          ของหวาน
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("beverage")}
        >
          เครื่องดื่ม
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("all cafe")}
        >
          All Cafe
        </button>
        <button
          className="categoryBTN"
          onClick={() => handleCategoryFilter("drug")}
        >
          ยาประจำบ้าน
        </button>
      </div>
      <div className="products">
        {filteredProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
