import React, { useContext, useState, useEffect } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const [exploreEndCount, setExploreEndCount] = useState(8);
  const [productsList, setProductsList] = useState([]);
  const { all_product } = useContext(ShopContext);

  const exploreFunc = () => {
    setExploreEndCount(exploreEndCount + 8);
  };

  const sortFunction = (type) => {
    let sortedProducts = [...productsList];
    if (type === "cheapToExpensive") {
      sortedProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (type === "expensiveToCheap") {
      sortedProducts.sort((a, b) => b.new_price - a.new_price);
    }
    setProductsList(sortedProducts);
  };

  useEffect(() => {
    const filteredProducts = all_product.filter(
      (itemProduct) => props.category === itemProduct.category
    );
    setProductsList(filteredProducts.slice(0, exploreEndCount));
  }, [all_product, props.category, exploreEndCount]);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{exploreEndCount}</span> out of {productsList.length}{" "}
          products
        </p>
        <div className="shopcategory-sort dropdown">
          <button className="dropbtn">
            Sort by <img src={dropdown_icon} alt="" />
          </button>
          <div className="dropdown-content">
            <li onClick={() => sortFunction("cheapToExpensive")}>
              Cheap to Expensive
            </li>
            <li onClick={() => sortFunction("expensiveToCheap")}>
              Expensive to Cheap
            </li>
          </div>
        </div>
      </div>
      <div className="shopcategory-products">
        {productsList.map((product, i) => (
          <Item
            key={i}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        {exploreEndCount <= productsList.length && (
          <button onClick={exploreFunc}>Explore More </button>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
