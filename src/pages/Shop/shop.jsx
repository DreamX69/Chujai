import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="shop">
      <div className="shopTitle"></div>
      <div className="searchBar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="ค้นหา"
        />
      </div>
      <div className="categoryselect">
        <button
          className={`categoryBTN ${selectedCategory === null ? "active" : ""}`}
          onClick={() => handleCategoryFilter(null)}
        >
          สินค้าทั้งหมด
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "snack" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("snack")}
        >
          อาหารรองท้อง ทานเล่น
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "bakery" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("bakery")}
        >
          เบเกอรี่
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "ready to eat food" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("ready to eat food")}
        >
          อาหารพร้อมทาน
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "dessert" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("dessert")}
        >
          ของหวาน
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "beverage" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("beverage")}
        >
          เครื่องดื่ม
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "all cafe" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("all cafe")}
        >
          All Cafe
        </button>
        <button
          className={`categoryBTN ${
            selectedCategory === "drug" ? "active" : ""
          }`}
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
